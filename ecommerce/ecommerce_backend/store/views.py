from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from .models import Category, Product, Cart, CartItem, Order, OrderItem
from .serializers import CategorySerializer, ProductSerializer, CartSerializer,CartItemSerializer, OrderSerializer, OrderItemSerializer
from .filters import ProductFilter
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status  


# Create your views here.
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at', 'stock']

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [AllowAny]

    # def get_queryset(self):
    #     return Cart.objects.filter(user=self.request.user)

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)

class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [AllowAny]

    # def get_queryset(self):
    #     return CartItem.objects.filter(cart__user=self.request.user)
    def get_queryset(self):
        cart_id = self.kwargs['cart_pk']  # URL should include cart ID
        return CartItem.objects.filter(cart_id=self.kwargs['cart_pk'])

    def perform_create(self, serializer):
        # cart_id = self.kwargs['cart_pk']
        # serializer.save(cart_id=cart_id)
        serializer.save(cart_id=self.kwargs['cart_pk'])

class OrderViewSet(viewsets.ModelViewSet):
    '''Order functionality'''
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'], url_path='checkout/(?P<cart_id>[^/.]+)')
    def checkout(self, request, cart_id=None):
        try:
            cart = Cart.objects.get(pk=cart_id)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart not found'}, status=404)

        if cart.items.count() == 0:
            return Response({'error': 'Cart is empty'}, status=400)

        # Create the order
        order = Order.objects.create(user=request.user)

        # Copy cart items into the order
        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price  # snapshot price
            )

        # Optionally: clear the cart
        cart.items.all().delete()

        return Response(OrderSerializer(order).data, status=201)