from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

class Train(models.Model):
    name = models.CharField(max_length=100)
    number = models.CharField(max_length=10, unique=True)
    departure_time = models.TimeField()
    arrival_time = models.TimeField()
    duration = models.CharField(max_length=10)
    
    # Seat availability
    first_ac_seats = models.IntegerField(default=0)
    second_ac_seats = models.IntegerField(default=0)
    third_ac_seats = models.IntegerField(default=0)
    sleeper_seats = models.IntegerField(default=0)
    general_seats = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} ({self.number})"

class Route(models.Model):
    train = models.ForeignKey(Train, on_delete=models.CASCADE, related_name='routes')
    from_station = models.CharField(max_length=100)
    to_station = models.CharField(max_length=100)
    distance = models.IntegerField(help_text="Distance in kilometers")
    
    # Pricing for different classes
    first_ac_price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    second_ac_price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    third_ac_price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    sleeper_price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    general_price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    
    def __str__(self):
        return f"{self.from_station} to {self.to_station}"

class Passenger(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]
    
    name = models.CharField(max_length=100)
    age = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(120)])
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    id_proof = models.CharField(max_length=50)
    
    def __str__(self):
        return f"{self.name} ({self.age})"

class Booking(models.Model):
    BOOKING_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]
    
    SEAT_CLASS_CHOICES = [
        ('1st-ac', '1st AC'),
        ('2nd-ac', '2nd AC'),
        ('3rd-ac', '3rd AC'),
        ('sleeper', 'Sleeper'),
        ('general', 'General'),
    ]
    
    BOOKING_TYPE_CHOICES = [
        ('regular', 'Regular'),
        ('tatkal', 'Tatkal'),
    ]
    
    booking_id = models.CharField(max_length=20, unique=True, default=uuid.uuid4)
    pnr = models.CharField(max_length=10, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    train = models.ForeignKey(Train, on_delete=models.CASCADE)
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    passengers = models.ManyToManyField(Passenger)
    
    travel_date = models.DateField()
    seat_class = models.CharField(max_length=10, choices=SEAT_CLASS_CHOICES)
    booking_type = models.CharField(max_length=10, choices=BOOKING_TYPE_CHOICES, default='regular')
    
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=BOOKING_STATUS_CHOICES, default='pending')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        if not self.pnr:
            self.pnr = f"PNR{uuid.uuid4().hex[:6].upper()}"
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"Booking {self.booking_id} - {self.pnr}"

class Seat(models.Model):
    SEAT_TYPE_CHOICES = [
        ('window', 'Window'),
        ('middle', 'Middle'),
        ('aisle', 'Aisle'),
    ]
    
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='seats')
    seat_number = models.CharField(max_length=10)
    coach = models.CharField(max_length=10, default='A1')
    seat_type = models.CharField(max_length=10, choices=SEAT_TYPE_CHOICES, default='middle')
    passenger = models.ForeignKey(Passenger, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"Seat {self.seat_number} - Coach {self.coach}"

class Payment(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]
    
    PAYMENT_METHOD_CHOICES = [
        ('card', 'Credit/Debit Card'),
        ('upi', 'UPI'),
        ('netbanking', 'Net Banking'),
    ]
    
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='payment')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    transaction_id = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Payment {self.transaction_id} - {self.status}"