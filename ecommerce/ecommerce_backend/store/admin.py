from django.contrib import admin
from .models import Product, Category, Payment, Order, OrderItem

class OrderAdmin(admin.ModelAdmin):
    readonly_fields = [
        'user', 'created_at', 'status', 'full_name',
        'phone_number', 'address', 'city', 'postal_code',
        'country', 'email'
    ]

    list_display = ['id', 'user', 'created_at', 'status']
    ordering = ['-created_at']
    search_fields = ['user__username', 'email', 'phone_number']
    # list_filter = ['status', 'created_at']

# Register your models here.
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Payment)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem)