from rest_framework import serializers
from .models import Category, Product, Cart, CartItem, Order, OrderItem

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        # model = Category
        # fields = '__all__'
        model = Category
        fields = ['id', 'name', 'description']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)  # For GET (readable nested object)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )  # For POST/PUT
    class Meta:
        model = Product
        # fields = '__all__'
        fields = [
            'id',
            'name',
            'description',
            'price',
            'category',
            'category_id',
            # 'image',
            'stock',
            'is_available',
            'created_at'
        ]
        read_only_fields = ['created_at']

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), source='product', write_only=True
    )

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField() #For cart totals

    class Meta:
        model = Cart
        fields = ['id', 'created_at', 'items', 'total_price']
        read_only_fields = ['id', 'created_at']
    
    def get_total_price(self, cart):
        total = sum(item.product.price * item.quantity for item in cart.items.all())
        return f"{total:.2f}"
    

class OrderItemSerializer(serializers.ModelSerializer):
    '''orderItem serializer'''
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    '''order serializer'''
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'created_at', 'status', 'items']
        read_only_fields = ['user', 'created_at', 'status', 'items']