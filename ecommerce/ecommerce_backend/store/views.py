from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from .models import Category, Product, Cart, CartItem, Order, OrderItem, Payment
from .serializers import CategorySerializer, ProductSerializer, CartSerializer,CartItemSerializer, OrderSerializer, OrderItemSerializer
from .filters import ProductFilter
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status  
from .permissions import IsAdminOrReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .mpesa import lipa_na_mpesa

from django.core.management import call_command
from django.http import HttpResponse


# Create your views here.
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = ProductFilter
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ['category']  # for filtering
    search_fields = ['name', 'description', 'category__name']  # for search
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
    permission_classes = [AllowAny]  # Allow all users to view orders
    # permission_classes = [IsAuthenticatedOrReadOnly]


    def get_queryset(self):
        # return Order.objects.filter(user=self.request.user)
        # Admin sees all, user sees only their orders
        if self.request.user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'], url_path='checkout/(?P<cart_id>[^/.]+)')
    def checkout(self, request, cart_id=None):
        try:
            cart = Cart.objects.get(pk=cart_id)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart not found'}, status=404)

        if cart.items.count() == 0:
            return Response({'error': 'Cart is empty'}, status=400)
        
        # ✅ Only assign user if authenticated
        user = request.user if request.user.is_authenticated else None

        # Create the order
        order = Order.objects.create(
            # user=request.user,
            user=user,
            # cart=cart,
            # cart=cart,
            full_name=request.data['full_name'],
            phone_number=request.data['phone_number'],
            address=request.data['address'],
            city=request.data['city'],
            postal_code=request.data.get('postal_code', ''),
            country=request.data['country'],
            )

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

@api_view(['POST'])
def initiate_payment(request):
    phone = request.data.get('phone')
    amount = request.data.get('amount')

    if not phone or not amount:
        return Response({'error': 'Phone and amount are required.'}, status=400)

    result = lipa_na_mpesa(phone, int(amount))
    return Response(result)

# @api_view(['POST'])
# def mpesa_callback(request):
#     '''mpesa callback'''
#     print("✅ M-Pesa Callback Received:")
#     print(request.data)

#     # You can log to DB or update Order status here
#     return Response({
#         "ResultCode": 0,
#         "ResultDesc": "Accepted"
#     })

@api_view(['POST'])
def mpesa_callback(request):
    print("✅ M-Pesa Callback Received")
    print(request.data)

    try:
        callback = request.data['Body']['stkCallback']
        if callback['ResultCode'] == 0:
            metadata = callback['CallbackMetadata']['Item']
            data = {item['Name']: item.get('Value') for item in metadata}

            Payment.objects.create(
                receipt_number=data.get('MpesaReceiptNumber'),
                phone_number=str(data.get('PhoneNumber')),
                amount=data.get('Amount'),
                checkout_request_id=callback['CheckoutRequestID'],
                status='Success'
            )
            print("✅ Payment saved!")
        else:
            print("❌ Payment failed:", callback['ResultDesc'])

    except Exception as e:
        print("❌ Error parsing callback:", e)

    return Response({"ResultCode": 0, "ResultDesc": "Accepted"})

def trigger_admin_create(request):
    call_command('create_admin')
    return HttpResponse("Superuser created (if it didn't already exist). You can now log in at /admin/")