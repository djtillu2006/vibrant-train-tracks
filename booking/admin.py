from django.contrib import admin
from .models import Train, Route, Passenger, Booking, Seat, Payment

@admin.register(Train)
class TrainAdmin(admin.ModelAdmin):
    list_display = ['name', 'number', 'departure_time', 'arrival_time', 'duration']
    search_fields = ['name', 'number']
    list_filter = ['departure_time', 'arrival_time']

@admin.register(Route)
class RouteAdmin(admin.ModelAdmin):
    list_display = ['train', 'from_station', 'to_station', 'distance']
    search_fields = ['from_station', 'to_station', 'train__name']
    list_filter = ['train']

@admin.register(Passenger)
class PassengerAdmin(admin.ModelAdmin):
    list_display = ['name', 'age', 'gender', 'id_proof']
    search_fields = ['name', 'id_proof']
    list_filter = ['gender', 'age']

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['booking_id', 'pnr', 'user', 'train', 'travel_date', 'status', 'total_amount']
    search_fields = ['booking_id', 'pnr', 'user__username', 'train__name']
    list_filter = ['status', 'seat_class', 'booking_type', 'travel_date']
    readonly_fields = ['booking_id', 'pnr']

@admin.register(Seat)
class SeatAdmin(admin.ModelAdmin):
    list_display = ['booking', 'seat_number', 'coach', 'seat_type', 'passenger']
    search_fields = ['seat_number', 'coach', 'passenger__name']
    list_filter = ['seat_type', 'coach']

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['booking', 'amount', 'payment_method', 'status', 'transaction_id']
    search_fields = ['transaction_id', 'booking__pnr']
    list_filter = ['status', 'payment_method']
    readonly_fields = ['transaction_id']