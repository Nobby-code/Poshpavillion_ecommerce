from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os

class Command(BaseCommand):
    help = 'Creates a superuser if none exists'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        if not User.objects.filter(is_superuser=True).exists():
            User.objects.create_superuser(
                username='admin',
                email='nobby@gmail.com',
                password='jahome1234'
            )
            self.stdout.write(self.style.SUCCESS('Superuser created'))
        else:
            self.stdout.write('Superuser already exists')


# from django.core.management.base import BaseCommand
# from django.contrib.auth import get_user_model
# import os

# class Command(BaseCommand):
#     help = "Create a superuser automatically"

#     def handle(self, *args, **kwargs):
#         User = get_user_model()
#         username = os.getenv("DJANGO_SUPERUSER_USERNAME", "admin")
#         email = os.getenv("DJANGO_SUPERUSER_EMAIL", "nobby@gmail.com")
#         password = os.getenv("DJANGO_SUPERUSER_PASSWORD", "jahome1234")

#         if not User.objects.filter(username=username).exists():
#             User.objects.create_superuser(username=username, email=email, password=password)
#             self.stdout.write(self.style.SUCCESS(f"Superuser '{username}' created"))
#         else:
#             self.stdout.write(self.style.WARNING(f"Superuser '{username}' already exists"))