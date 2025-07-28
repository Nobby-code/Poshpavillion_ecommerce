from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter
from .views import CategoryViewSet, ProductViewSet, CartViewSet, CartItemViewSet, OrderViewSet, mpesa_callback, initiate_payment

from .views import CreateAdminView

print("Loaded CreateAdminView:", CreateAdminView)

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('products', ProductViewSet)
router.register('carts', CartViewSet, basename='cart')
# router.register('createadmin', CartViewSet, basename='createadmin')
# router.register('cart-items', CartItemViewSet, basename='cart-item')

# Nested router: cart-items under carts/<cart_id>/items/
cart_router = NestedDefaultRouter(router, r'carts', lookup='cart')
cart_router.register(r'items', CartItemViewSet, basename='cart-items')

router.register('orders', OrderViewSet, basename='order')

urlpatterns = [
    path('create-superuser/', CreateAdminView.as_view(), name='create-superuser'),
    path('', include(router.urls)),
    path('', include(cart_router.urls)),
    path('mpesa/confirmation/', mpesa_callback),
    path('mpesa/pay/', initiate_payment),
    
]