from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class UserGroup(models.Model):
    name = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.name


class Course(models.Model):
    name = models.CharField(max_length=255, null=True)
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(null=True, default=None)
    description = models.TextField(null=True, blank=True)
    max_students = models.IntegerField(default=0)
    enrolled_students = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Section(models.Model):
    name = models.CharField(max_length=255, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Lesson(models.Model):
    name = models.CharField(max_length=255, null=True)
    section = models.ForeignKey(Section, on_delete=models.CASCADE, null=True)
    date = models.DateField(default=timezone.now)
    content = models.TextField(null=True, default=None)

    def __str__(self):
        return self.name


class CourseMaterial(models.Model):
    name = models.CharField(max_length=255, null=True)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    file = models.FileField(upload_to="course_materials/")

    def __str__(self):
        return self.name


class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrollment_date = models.DateField(default=timezone.now)

    def __str__(self):
        return f"{self.user} - {self.course}"


class Schedule(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    start_time = models.TimeField(default=timezone.now)
    end_time = models.TimeField(null=True, default=None)

    def __str__(self):
        return f"{self.lesson} - {self.start_time} - {self.end_time}"


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    sent_date = models.DateField(default=timezone.now)

    def __str__(self):
        return f"{self.user} - {self.message}"


class Report(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    content = models.TextField(null=True, blank=True)
    submission_date = models.DateField(default=timezone.now)

    def __str__(self):
        return f"{self.user} - {self.lesson}"


class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(default=timezone.now)

    def __str__(self):
        return f"{self.user} - {self.amount}"


class Plan(models.Model):
    name = models.CharField(max_length=255, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    GENDER_CHOICES = (
        ("М", "Мужской"),
        ("Ж", "Женский"),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(verbose_name="ФИО ученика", max_length=255, null=True)
    birth_date = models.DateField(verbose_name="Дата рождения ученика", null=True)
    gender = models.CharField(
        verbose_name="Пол ученика", choices=GENDER_CHOICES, max_length=1, null=True
    )
    parent_contact_1 = models.CharField(
        verbose_name="Контакт родителя 1",
        max_length=255,
        null=True,
    )
    parent_contact_2 = models.CharField(
        verbose_name="Контакт родителя 2",
        max_length=255,
        blank=True,
        null=True,
    )
    parent_email = models.EmailField(
        verbose_name="Почта родителя (для создания аккаунта)", null=True
    )
    student_comment = models.TextField(
        verbose_name="Комментарий к ученику", blank=True, null=True
    )
    UserGroup = models.ForeignKey(
        "UserGroup",
        verbose_name="ID привязанной роли",
        on_delete=models.SET_NULL,
        null=True,
    )
    courses = (models.ManyToManyField(Course, related_name="students", blank=True),)

    def __str__(self):
        return self.full_name


class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE, null=True)
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(null=True, default=None)

    def __str__(self):
        return f"{self.user} - {self.plan}"


class UserSubscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE)
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(null=True, default=None)

    def __str__(self):
        return f"{self.user} - {self.subscription}"
