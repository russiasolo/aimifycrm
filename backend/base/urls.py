from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    StudentCRMViewSet,
    ContactsCRMViewSet,
    CourseCRMViewSet,
    CourseStudentsAddView,
    CourseStudentsRemoveView,
)

router = DefaultRouter()
router.register(r"students", StudentCRMViewSet)
router.register(r"contacts", ContactsCRMViewSet)
router.register(r"courses", CourseCRMViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path(
        "courses/<int:course_id>/students/add/",
        CourseStudentsAddView.as_view(),
        name="course-students-add",
    ),
    path(
        "courses/<int:course_id>/students/remove/",
        CourseStudentsRemoveView.as_view(),
        name="course-students-remove",
    ),
] + router.urls
