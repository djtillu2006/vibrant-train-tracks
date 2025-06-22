from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.paginator import Paginator
from django.db.models import Q
from .models import Train, Route, Booking, Passenger, Seat, Payment
from .forms import TrainSearchForm, PassengerForm, PaymentForm, PNRStatusForm, TrainStatusForm
import uuid
from datetime import datetime, timedelta
import random

def index(request):
    """Home page with train search form"""
    form = TrainSearchForm()
    
    if request.method == 'POST':
        form = TrainSearchForm(request.POST)
        if form.is_valid():
            # Store search data in session
            request.session['search_data'] = form.cleaned_data
            return redirect('booking:passenger_details')
    
    return render(request, 'booking/index.html', {'form': form})

def passenger_details(request):
    """Passenger details form"""
    search_data = request.session.get('search_data')
    if not search_data:
        messages.error(request, 'Please search for trains first.')
        return redirect('booking:index')
    
    passenger_count = search_data.get('passengers', 1)
    
    if request.method == 'POST':
        forms = []
        valid_forms = []
        
        for i in range(passenger_count):
            form = PassengerForm(request.POST, prefix=f'passenger_{i}')
            forms.append(form)
            if form.is_valid():
                valid_forms.append(form)
        
        if len(valid_forms) == passenger_count:
            # Save passenger data in session
            passengers_data = []
            for form in valid_forms:
                passengers_data.append(form.cleaned_data)
            
            request.session['passengers_data'] = passengers_data
            return redirect('booking:train_results')
        else:
            messages.error(request, 'Please fill all passenger details correctly.')
    else:
        forms = [PassengerForm(prefix=f'passenger_{i}') for i in range(passenger_count)]
    
    context = {
        'forms': forms,
        'search_data': search_data,
        'passenger_count': passenger_count,
        'is_tatkal': search_data.get('booking_type') == 'tatkal'
    }
    
    return render(request, 'booking/passenger_details.html', context)

def train_results(request):
    """Display available trains"""
    search_data = request.session.get('search_data')
    passengers_data = request.session.get('passengers_data')
    
    if not search_data or not passengers_data:
        messages.error(request, 'Please complete the search and passenger details first.')
        return redirect('booking:index')
    
    # Get available trains (mock data for demo)
    trains = Train.objects.all()[:3]  # Limit to 3 trains for demo
    
    # Get routes for pricing
    routes = Route.objects.filter(
        from_station__icontains=search_data['from_station'],
        to_station__icontains=search_data['to_station']
    )
    
    if not routes.exists():
        # Create mock route data
        for train in trains:
            Route.objects.get_or_create(
                train=train,
                from_station=search_data['from_station'],
                to_station=search_data['to_station'],
                defaults={
                    'distance': random.randint(200, 1500),
                    'first_ac_price': random.randint(2500, 4000),
                    'second_ac_price': random.randint(1800, 2500),
                    'third_ac_price': random.randint(1200, 1800),
                    'sleeper_price': random.randint(800, 1200),
                    'general_price': random.randint(400, 800),
                }
            )
        routes = Route.objects.filter(
            from_station__icontains=search_data['from_station'],
            to_station__icontains=search_data['to_station']
        )
    
    context = {
        'trains': trains,
        'routes': routes,
        'search_data': search_data,
        'passengers_data': passengers_data,
    }
    
    return render(request, 'booking/train_results.html', context)

@login_required
def payment(request, train_id):
    """Payment processing"""
    search_data = request.session.get('search_data')
    passengers_data = request.session.get('passengers_data')
    
    if not search_data or not passengers_data:
        messages.error(request, 'Session expired. Please start booking again.')
        return redirect('booking:index')
    
    train = get_object_or_404(Train, id=train_id)
    route = get_object_or_404(Route, 
        train=train,
        from_station__icontains=search_data['from_station'],
        to_station__icontains=search_data['to_station']
    )
    
    seat_class = request.GET.get('seat_class', 'general')
    
    # Calculate price based on seat class
    price_map = {
        '1st-ac': route.first_ac_price,
        '2nd-ac': route.second_ac_price,
        '3rd-ac': route.third_ac_price,
        'sleeper': route.sleeper_price,
        'general': route.general_price,
    }
    
    base_price = price_map.get(seat_class, route.general_price)
    total_price = base_price * len(passengers_data)
    
    if request.method == 'POST':
        form = PaymentForm(request.POST)
        if form.is_valid():
            # Store payment data in session
            request.session['payment_data'] = {
                'train_id': train_id,
                'seat_class': seat_class,
                'total_price': float(total_price),
                'payment_method': form.cleaned_data['payment_method']
            }
            return redirect('booking:seat_selection', train_id=train_id)
    else:
        form = PaymentForm()
    
    context = {
        'form': form,
        'train': train,
        'route': route,
        'seat_class': seat_class,
        'base_price': base_price,
        'total_price': total_price,
        'search_data': search_data,
        'passengers_data': passengers_data,
    }
    
    return render(request, 'booking/payment.html', context)

@login_required
def seat_selection(request, train_id):
    """Seat selection page"""
    search_data = request.session.get('search_data')
    passengers_data = request.session.get('passengers_data')
    payment_data = request.session.get('payment_data')
    
    if not all([search_data, passengers_data, payment_data]):
        messages.error(request, 'Session expired. Please start booking again.')
        return redirect('booking:index')
    
    train = get_object_or_404(Train, id=train_id)
    
    # Generate mock seat layout
    seats = []
    for row in range(1, 6):
        for seat_letter in ['A', 'B', 'C', 'D', 'E', 'F']:
            seat_id = f"{row}{seat_letter}"
            seat_type = 'window' if seat_letter in ['A', 'F'] else ('aisle' if seat_letter in ['C', 'D'] else 'middle')
            status = 'occupied' if random.random() < 0.3 else 'available'
            seats.append({
                'id': seat_id,
                'number': seat_id,
                'type': seat_type,
                'status': status,
                'row': row
            })
    
    if request.method == 'POST':
        selected_seats = request.POST.getlist('selected_seats')
        if len(selected_seats) == len(passengers_data):
            # Create booking
            booking = create_booking(request, train, selected_seats)
            if booking:
                # Clear session data
                for key in ['search_data', 'passengers_data', 'payment_data']:
                    if key in request.session:
                        del request.session[key]
                
                return redirect('booking:e_ticket', booking_id=booking.booking_id)
        else:
            messages.error(request, f'Please select {len(passengers_data)} seats.')
    
    context = {
        'train': train,
        'seats': seats,
        'search_data': search_data,
        'passengers_data': passengers_data,
        'payment_data': payment_data,
        'required_seats': len(passengers_data),
    }
    
    return render(request, 'booking/seat_selection.html', context)

def create_booking(request, train, selected_seats):
    """Helper function to create booking"""
    try:
        search_data = request.session.get('search_data')
        passengers_data = request.session.get('passengers_data')
        payment_data = request.session.get('payment_data')
        
        # Get route
        route = Route.objects.get(
            train=train,
            from_station__icontains=search_data['from_station'],
            to_station__icontains=search_data['to_station']
        )
        
        # Create booking
        booking = Booking.objects.create(
            booking_id=f"TKT{uuid.uuid4().hex[:8].upper()}",
            user=request.user,
            train=train,
            route=route,
            travel_date=search_data['travel_date'],
            seat_class=payment_data['seat_class'],
            booking_type=search_data['booking_type'],
            total_amount=payment_data['total_price'],
            status='confirmed'
        )
        
        # Create passengers and seats
        for i, (passenger_data, seat_id) in enumerate(zip(passengers_data, selected_seats)):
            passenger = Passenger.objects.create(**passenger_data)
            booking.passengers.add(passenger)
            
            Seat.objects.create(
                booking=booking,
                seat_number=seat_id,
                coach='A1',
                seat_type='window' if seat_id[-1] in ['A', 'F'] else 'middle',
                passenger=passenger
            )
        
        # Create payment record
        Payment.objects.create(
            booking=booking,
            amount=payment_data['total_price'],
            payment_method=payment_data['payment_method'],
            transaction_id=f"TXN{uuid.uuid4().hex[:10].upper()}",
            status='completed'
        )
        
        return booking
        
    except Exception as e:
        messages.error(request, f'Booking failed: {str(e)}')
        return None

@login_required
def e_ticket(request, booking_id):
    """Display e-ticket"""
    booking = get_object_or_404(Booking, booking_id=booking_id, user=request.user)
    
    context = {
        'booking': booking,
        'passengers': booking.passengers.all(),
        'seats': booking.seats.all(),
        'payment': booking.payment,
    }
    
    return render(request, 'booking/e_ticket.html', context)

def pnr_status(request):
    """PNR status check"""
    form = PNRStatusForm()
    booking = None
    
    if request.method == 'POST':
        form = PNRStatusForm(request.POST)
        if form.is_valid():
            pnr = form.cleaned_data['pnr']
            try:
                booking = Booking.objects.get(pnr=pnr)
            except Booking.DoesNotExist:
                messages.error(request, 'PNR not found.')
    
    context = {
        'form': form,
        'booking': booking,
    }
    
    if booking:
        context.update({
            'passengers': booking.passengers.all(),
            'seats': booking.seats.all(),
        })
    
    return render(request, 'booking/pnr_status.html', context)

def train_status(request):
    """Train status tracking"""
    form = TrainStatusForm()
    train_data = None
    
    if request.method == 'POST':
        form = TrainStatusForm(request.POST)
        if form.is_valid():
            query = form.cleaned_data['query']
            # Mock train status data
            train_data = {
                'name': 'Rajdhani Express',
                'number': '12001',
                'date': datetime.now().strftime('%d %b %Y'),
                'status': 'Running On Time',
                'current_station': 'Mathura Junction',
                'next_station': 'Agra Cantt',
                'delay': 0,
                'stations': [
                    {'name': 'New Delhi', 'code': 'NDLS', 'arrival': 'Source', 'departure': '06:00', 'distance': '0 km', 'status': 'completed'},
                    {'name': 'Mathura Junction', 'code': 'MTJ', 'arrival': '07:45', 'departure': '07:47', 'distance': '145 km', 'status': 'current'},
                    {'name': 'Agra Cantt', 'code': 'AGC', 'arrival': '08:30', 'departure': '08:32', 'distance': '200 km', 'status': 'upcoming'},
                    {'name': 'Jhansi Junction', 'code': 'JHS', 'arrival': '10:15', 'departure': '10:20', 'distance': '415 km', 'status': 'upcoming'},
                    {'name': 'Bhopal Junction', 'code': 'BPL', 'arrival': '12:30', 'departure': '12:35', 'distance': '680 km', 'status': 'upcoming'},
                    {'name': 'Mumbai Central', 'code': 'BCT', 'arrival': '14:30', 'departure': 'Destination', 'distance': '1384 km', 'status': 'upcoming'},
                ]
            }
    
    context = {
        'form': form,
        'train_data': train_data,
    }
    
    return render(request, 'booking/train_status.html', context)

@login_required
def cancellation(request):
    """Ticket cancellation"""
    form = PNRStatusForm()
    booking = None
    
    if request.method == 'POST':
        if 'check_pnr' in request.POST:
            form = PNRStatusForm(request.POST)
            if form.is_valid():
                pnr = form.cleaned_data['pnr']
                try:
                    booking = Booking.objects.get(pnr=pnr, user=request.user)
                except Booking.DoesNotExist:
                    messages.error(request, 'PNR not found or you are not authorized to cancel this booking.')
        
        elif 'cancel_booking' in request.POST:
            booking_id = request.POST.get('booking_id')
            try:
                booking = Booking.objects.get(booking_id=booking_id, user=request.user)
                booking.status = 'cancelled'
                booking.save()
                
                # Update payment status
                if hasattr(booking, 'payment'):
                    booking.payment.status = 'refunded'
                    booking.payment.save()
                
                messages.success(request, f'Booking cancelled successfully. Refund will be processed within 5-7 business days.')
                booking = None
            except Booking.DoesNotExist:
                messages.error(request, 'Booking not found.')
    
    context = {
        'form': form,
        'booking': booking,
    }
    
    if booking:
        context.update({
            'passengers': booking.passengers.all(),
            'seats': booking.seats.all(),
        })
    
    return render(request, 'booking/cancellation.html', context)

@login_required
def my_bookings(request):
    """User's booking history"""
    bookings = Booking.objects.filter(user=request.user).order_by('-created_at')
    
    paginator = Paginator(bookings, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
    }
    
    return render(request, 'booking/my_bookings.html', context)