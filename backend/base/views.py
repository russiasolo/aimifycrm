from rest_framework import viewsets
from .models import CustomUser, Student, Teacher, Course, Lesson, Subscription, PricingPlan, EducationalCenter
from .serializers import (CustomUserSerializer, StudentSerializer, TeacherSerializer, CourseSerializer, LessonSerializer, SubscriptionSerializer, PricingPlanSerializer, EducationalCenterSerializer)


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer


class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer


class PricingPlanViewSet(viewsets.ModelViewSet):
    queryset = PricingPlan.objects.all()
    serializer_class = PricingPlanSerializer


class EducationalCenterViewSet(viewsets.ModelViewSet):
    queryset = EducationalCenter.objects.all()
    serializer_class = EducationalCenterSerializer
