from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter
from .views import CategoryViewSet, ProductViewSet, CartViewSet, CartItemViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('products', ProductViewSet)
router.register('carts', CartViewSet, basename='cart')
# router.register('cart-items', CartItemViewSet, basename='cart-item')

# Nested router: cart-items under carts/<cart_id>/items/
cart_router = NestedDefaultRouter(router, r'carts', lookup='cart')
cart_router.register(r'items', CartItemViewSet, basename='cart-items')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(cart_router.urls)),
]