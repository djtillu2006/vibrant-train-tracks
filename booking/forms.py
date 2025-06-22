from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Passenger, Booking, Payment
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Row, Column, Field, HTML
from crispy_forms.bootstrap import FormActions

class TrainSearchForm(forms.Form):
    BOOKING_TYPE_CHOICES = [
        ('regular', 'Regular Booking'),
        ('tatkal', 'Tatkal Booking'),
    ]
    
    from_station = forms.CharField(
        max_length=100,
        widget=forms.TextInput(attrs={
            'placeholder': 'Departure city',
            'class': 'form-control'
        })
    )
    to_station = forms.CharField(
        max_length=100,
        widget=forms.TextInput(attrs={
            'placeholder': 'Destination city',
            'class': 'form-control'
        })
    )
    travel_date = forms.DateField(
        widget=forms.DateInput(attrs={
            'type': 'date',
            'class': 'form-control'
        })
    )
    passengers = forms.IntegerField(
        min_value=1,
        max_value=6,
        initial=1,
        widget=forms.Select(choices=[(i, f"{i} Passenger{'s' if i > 1 else ''}") for i in range(1, 7)], attrs={
            'class': 'form-control'
        })
    )
    booking_type = forms.ChoiceField(
        choices=BOOKING_TYPE_CHOICES,
        initial='regular',
        widget=forms.RadioSelect(attrs={
            'class': 'form-check-input'
        })
    )
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Row(
                Column('from_station', css_class='form-group col-md-3 mb-0'),
                Column('to_station', css_class='form-group col-md-3 mb-0'),
                Column('travel_date', css_class='form-group col-md-3 mb-0'),
                Column('passengers', css_class='form-group col-md-3 mb-0'),
                css_class='form-row'
            ),
            Row(
                Column('booking_type', css_class='form-group col-md-12 mb-0'),
                css_class='form-row'
            ),
            FormActions(
                Submit('search', 'Search Trains', css_class='btn btn-primary btn-lg')
            )
        )

class PassengerForm(forms.ModelForm):
    class Meta:
        model = Passenger
        fields = ['name', 'age', 'gender', 'id_proof']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter full name'}),
            'age': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Enter age', 'min': 1, 'max': 120}),
            'gender': forms.Select(attrs={'class': 'form-control'}),
            'id_proof': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Aadhaar/PAN/Passport'}),
        }

class PaymentForm(forms.ModelForm):
    card_number = forms.CharField(
        max_length=19,
        required=False,
        widget=forms.TextInput(attrs={
            'placeholder': '1234 5678 9012 3456',
            'class': 'form-control'
        })
    )
    card_name = forms.CharField(
        max_length=100,
        required=False,
        widget=forms.TextInput(attrs={
            'placeholder': 'John Doe',
            'class': 'form-control'
        })
    )
    expiry_date = forms.CharField(
        max_length=5,
        required=False,
        widget=forms.TextInput(attrs={
            'placeholder': 'MM/YY',
            'class': 'form-control'
        })
    )
    cvv = forms.CharField(
        max_length=4,
        required=False,
        widget=forms.PasswordInput(attrs={
            'placeholder': '123',
            'class': 'form-control'
        })
    )
    upi_id = forms.CharField(
        max_length=100,
        required=False,
        widget=forms.TextInput(attrs={
            'placeholder': 'yourname@paytm',
            'class': 'form-control'
        })
    )
    
    class Meta:
        model = Payment
        fields = ['payment_method']
        widgets = {
            'payment_method': forms.RadioSelect(attrs={'class': 'form-check-input'})
        }

class PNRStatusForm(forms.Form):
    pnr = forms.CharField(
        max_length=10,
        min_length=10,
        widget=forms.TextInput(attrs={
            'placeholder': 'Enter 10-digit PNR number',
            'class': 'form-control',
            'pattern': '[0-9A-Z]{10}'
        })
    )
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Row(
                Column('pnr', css_class='form-group col-md-8 mb-0'),
                Column(
                    Submit('check', 'Check Status', css_class='btn btn-primary'),
                    css_class='form-group col-md-4 mb-0'
                ),
                css_class='form-row'
            )
        )

class TrainStatusForm(forms.Form):
    query = forms.CharField(
        max_length=100,
        widget=forms.TextInput(attrs={
            'placeholder': 'Enter train number or PNR',
            'class': 'form-control'
        })
    )
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Row(
                Column('query', css_class='form-group col-md-8 mb-0'),
                Column(
                    Submit('track', 'Track Train', css_class='btn btn-primary'),
                    css_class='form-group col-md-4 mb-0'
                ),
                css_class='form-row'
            )
        )