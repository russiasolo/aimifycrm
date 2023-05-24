from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        return True


class IsAdministrator(permissions.BasePermission):
    """
    Custom permission to only allow administrators of an object to edit it.
    """

    # Replace the following code with your own permissions logic
    def has_object_permission(self, request, view, obj):
        return False


class IsTeacher(permissions.BasePermission):
    """
    Custom permission to only allow teachers of an object to edit it.
    """

    # Replace the following code with your own permissions logic
    def has_object_permission(self, request, view, obj):
        return False


class IsStudent(permissions.BasePermission):
    """
    Custom permission to only allow students of an object to edit it.
    """

    # Replace the following code with your own permissions logic
    def has_object_permission(self, request, view, obj):
        return False
