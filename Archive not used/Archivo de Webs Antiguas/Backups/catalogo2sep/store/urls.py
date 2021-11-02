from django.urls import path
from . import views #. se refiere al folder actual

app_name = 'store'

urlpatterns = [
    path('', views.all_products, name='all_products'),
    path('item/<slug:slug>/', views.product_detail, name='product_detail'),
    path('search/<slug:categoria_slug>/', views.categoria_list, name='categoria_list'),
    
]