from django.urls import path
from . import views

app_name = 'booking'

urlpatterns = [
    path('', views.index, name='index'),
    path('passenger-details/', views.passenger_details, name='passenger_details'),
    path('train-results/', views.train_results, name='train_results'),
    path('payment/<int:train_id>/', views.payment, name='payment'),
    path('seat-selection/<int:train_id>/', views.seat_selection, name='seat_selection'),
    path('e-ticket/<str:booking_id>/', views.e_ticket, name='e_ticket'),
    path('pnr-status/', views.pnr_status, name='pnr_status'),
    path('train-status/', views.train_status, name='train_status'),
    path('cancellation/', views.cancellation, name='cancellation'),
    path('my-bookings/', views.my_bookings, name='my_bookings'),
]