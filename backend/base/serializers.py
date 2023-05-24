from rest_framework import serializers
from .models import StudentCRM, ContactsCRM, CourseCRM


class ContactsCRMSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactsCRM
        fields = "__all__"


class StudentShortCRMSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCRM
        fields = ["st_id", "st_name", "st_surname", "st_patronymic"]

    def create(self, validated_data):
        return StudentCRM.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.st_name = validated_data.get("st_name", instance.st_name)
        instance.st_surname = validated_data.get("st_surname", instance.st_surname)
        instance.st_patronymic = validated_data.get(
            "st_patronymic", instance.st_patronymic
        )
        instance.save()
        return instance


class CourseCRMSerializer(serializers.ModelSerializer):
    students = StudentShortCRMSerializer(many=True, required=False)

    class Meta:
        model = CourseCRM
        fields = "__all__"

    def update(self, instance, validated_data):
        students_data = validated_data.pop("students", [])
        instance = super().update(instance, validated_data)

        # Add students
        for student_data in students_data:
            try:
                student = StudentCRM.objects.get(st_id=student_data.get("st_id"))
                instance.students.add(student)
            except StudentCRM.DoesNotExist:
                pass  # or you may raise a ValidationError

        return instance


class StudentCRMSerializer(serializers.ModelSerializer):
    contacts = ContactsCRMSerializer(many=True, read_only=True)
    courses = CourseCRMSerializer(many=True, read_only=True)

    class Meta:
        model = StudentCRM
        fields = [
            "st_id",
            "st_name",
            "st_surname",
            "st_patronymic",
            "st_birthdate",
            "st_gender",
            "st_description",
            "st_createdAt",
            "contacts",
            "courses",
        ]


class CourseStudentsUpdateSerializer(serializers.Serializer):
    student_ids = serializers.ListField(child=serializers.IntegerField())
    action = serializers.CharField()

    def update(self, instance, validated_data):
        students_data = validated_data.pop("students", [])
        instance = super().update(instance, validated_data)

        current_student_ids = [student.st_id for student in instance.students.all()]
        new_student_ids = [student_data.get("st_id") for student_data in students_data]

        # Find ids to add and remove
        ids_to_add = set(new_student_ids) - set(current_student_ids)
        ids_to_remove = set(current_student_ids) - set(new_student_ids)

        # Add students
        for student_id in ids_to_add:
            try:
                student = StudentCRM.objects.get(st_id=student_id)
                instance.students.add(student)
            except StudentCRM.DoesNotExist:
                pass  # or you may raise a ValidationError

        # Remove students
        for student_id in ids_to_remove:
            try:
                student = StudentCRM.objects.get(st_id=student_id)
                instance.students.remove(student)
            except StudentCRM.DoesNotExist:
                pass  # or you may raise a ValidationError

            return instance
