from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to allow only admins to edit, but everyone can read.
    """

    def has_permission(self, request, view):
        # SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS']
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff