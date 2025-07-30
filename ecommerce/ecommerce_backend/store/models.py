from django.db import models
from django.contrib.auth.models import User
import uuid
from django.utils.text import slugify

# Create your models here.
class Category(models.Model):
    '''Category model with the required fields'''
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(null=True, blank=True)

    def save(self, *args, **kwargs):
        # Automatically generate slug from name if not set
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Product(models.Model):
    '''product model'''
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/')
    stock = models.PositiveIntegerField()
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Cart(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    # created_at = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

class CartItem(models.Model):
    # cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    # product = models.ForeignKey(Product, on_delete=models.CASCADE)
    # quantity = models.PositiveIntegerField(default=1)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ['cart', 'product']  # prevent duplicate items in same cart

class Order(models.Model):
    '''To store order status'''
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('shipped', 'Shipped'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

     # checkout address fields:
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    address = models.CharField(max_length=255, default='Nairobi', blank=True)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=100, default='Kenya')
    email = models.CharField(max_length=100)

    def __str__(self):
        # return f"===Order {self.id} by {self.user.username}==="
        if self.user:
            return f"=== Order {self.id} by {self.user.username} ==="
        return f"=== Order {self.id} by Guest ==="

    
    def get_total_price(self):
        '''To get total price of  the order'''
        return sum(item.get_total_price() for item in self.items.all())
    
class OrderItem(models.Model):
    '''List of ordered items with their totals'''
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Copy price from product

    def get_total_price(self):
        '''Total cost of the order'''
        return self.price * self.quantity
    
class Payment(models.Model):
    '''Payment model to store payment details'''
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='payments', default=1) #link to order
    receipt_number = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_date = models.DateTimeField(auto_now_add=True)
    checkout_request_id = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=50, default='Success')  # or 'Failed'

    def __str__(self):
        return f"TransId: {self.receipt_number} - Amount paid: {self.amount} TransDate: {self.transaction_date.strftime('%Y-%m-%d %H:%M:%S')}, Status:{self.status}"