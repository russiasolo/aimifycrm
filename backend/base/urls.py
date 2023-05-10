from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    UserGroupViewSet,
    CourseViewSet,
    SectionViewSet,
    LessonViewSet,
    CourseMaterialViewSet,
    EnrollmentViewSet,
    ScheduleViewSet,
    NotificationViewSet,
    ReportViewSet,
    PaymentViewSet,
    PlanViewSet,
    UserProfileViewSet,
    SubscriptionViewSet,
    UserSubscriptionViewSet,
)

router = DefaultRouter()
router.register(r"user_groups", UserGroupViewSet)
router.register(r"courses", CourseViewSet)
router.register(r"sections", SectionViewSet)
router.register(r"lessons", LessonViewSet)
router.register(r"course_materials", CourseMaterialViewSet)
router.register(r"enrollments", EnrollmentViewSet)
router.register(r"schedules", ScheduleViewSet)
router.register(r"notifications", NotificationViewSet)
router.register(r"reports", ReportViewSet)
router.register(r"payments", PaymentViewSet)
router.register(r"plans", PlanViewSet)
router.register(r"user_profiles", UserProfileViewSet)
router.register(r"subscriptions", SubscriptionViewSet)
router.register(r"user_subscriptions", UserSubscriptionViewSet)

urlpatterns = router.urls
