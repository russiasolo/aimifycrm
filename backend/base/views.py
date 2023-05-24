from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import StudentCRM, ContactsCRM, CourseCRM
from .serializers import (
    StudentCRMSerializer,
    ContactsCRMSerializer,
    CourseCRMSerializer,
)
from .permissions import IsOwner, IsAdministrator, IsTeacher, IsStudent


class StudentCRMViewSet(viewsets.ModelViewSet):
    queryset = StudentCRM.objects.all()
    serializer_class = StudentCRMSerializer
    permission_classes = [IsOwner | permissions.IsAuthenticatedOrReadOnly]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ContactsCRMViewSet(viewsets.ModelViewSet):
    queryset = ContactsCRM.objects.all()
    serializer_class = ContactsCRMSerializer
    permission_classes = [IsOwner | permissions.IsAuthenticatedOrReadOnly]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class CourseCRMViewSet(viewsets.ModelViewSet):
    queryset = CourseCRM.objects.all()
    serializer_class = CourseCRMSerializer
    permission_classes = [IsOwner | permissions.IsAuthenticatedOrReadOnly]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        student_ids_to_add = request.data.get("student_ids_to_add", [])
        student_ids_to_remove = request.data.get("student_ids_to_remove", [])

        if student_ids_to_add:
            students_to_add = StudentCRM.objects.filter(pk__in=student_ids_to_add)
            instance.students.add(*students_to_add)

        if student_ids_to_remove:
            students_to_remove = StudentCRM.objects.filter(pk__in=student_ids_to_remove)
            instance.students.remove(*students_to_remove)

        return Response(serializer.data)


class CourseStudentsAddView(APIView):
    def put(self, request, course_id):
        course = CourseCRM.objects.get(pk=course_id)
        student_ids = request.data.get("student_ids", [])
        students = StudentCRM.objects.filter(pk__in=student_ids)

        course.students.add(*students)

        serializer = CourseCRMSerializer(course)
        return Response(serializer.data)


class CourseStudentsRemoveView(APIView):
    def put(self, request, course_id):
        course = CourseCRM.objects.get(pk=course_id)
        student_ids = request.data.get("student_ids", [])
        students = StudentCRM.objects.filter(pk__in=student_ids)

        course.students.remove(*students)

        serializer = CourseCRMSerializer(course)
        return Response(serializer.data)
