from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.CustomUserViewSet)
router.register(r'students', views.StudentViewSet)
router.register(r'teachers', views.TeacherViewSet)
router.register(r'courses', views.CourseViewSet)
router.register(r'lessons', views.LessonViewSet)
router.register(r'subscriptions', views.SubscriptionViewSet)
router.register(r'pricing_plans', views.PricingPlanViewSet)
router.register(r'educational_centers', views.EducationalCenterViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
