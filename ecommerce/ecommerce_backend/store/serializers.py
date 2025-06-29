from rest_framework import serializers
from .models import Category, Product

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