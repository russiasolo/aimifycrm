from django.db import models
from django.db.models.signals import m2m_changed
from django.dispatch import receiver
from django.core.exceptions import ValidationError


class StudentCRM(models.Model):
    st_id = models.AutoField(primary_key=True)
    st_name = models.CharField(max_length=255)
    st_surname = models.CharField(max_length=255)
    st_patronymic = models.CharField(max_length=255, null=True)
    st_birthdate = models.DateField()
    st_gender = models.CharField(max_length=255)
    st_description = models.TextField(null=True)
    st_createdAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "student_crm"

    def __str__(self):
        return f" {self.st_surname} {self.st_name} {self.st_patronymic}"


class ContactsCRM(models.Model):
    ct_id = models.AutoField(primary_key=True)
    students = models.ManyToManyField(StudentCRM, related_name="contacts")
    ct_name = models.CharField(max_length=255)
    ct_person = models.CharField(max_length=255)
    ct_number = models.CharField(max_length=20)
    ct_email = models.EmailField(null=True)

    class Meta:
        db_table = "contacts_crm"

    def __str__(self):
        return f" {self.ct_name}, {self.ct_person};"


class CourseCRM(models.Model):
    cr_id = models.AutoField(primary_key=True)
    students = models.ManyToManyField(StudentCRM, related_name="courses", blank=True)
    cr_name = models.CharField(max_length=255)
    cr_startdate = models.DateField()
    cr_enddate = models.DateField()
    cr_description = models.TextField(null=True, blank=True)
    cr_nowst = models.IntegerField(default=0)
    cr_maxst = models.IntegerField()
    cr_status = models.CharField(max_length=255)

    class Meta:
        db_table = "course_crm"

    def __str__(self):
        return self.cr_name

    def clean(self):
        if self.cr_nowst > self.cr_maxst:
            raise ValidationError("The number of students exceeds the maximum allowed.")


## courses models update students count
@receiver(m2m_changed, sender=CourseCRM.students.through)
def update_students_count(sender, instance, action, **kwargs):
    if action == "post_add" or action == "post_remove":
        instance.cr_nowst = instance.students.count()
        instance.save()
