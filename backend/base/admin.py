from django.contrib import admin
from .models import (
    UserGroup,
    Course,
    Section,
    Lesson,
    CourseMaterial,
    Enrollment,
    Schedule,
    Notification,
    Report,
    Payment,
    Plan,
    UserProfile,
    Subscription,
    UserSubscription,
)

admin.site.register(UserGroup)
admin.site.register(Course)
admin.site.register(Section)
admin.site.register(Lesson)
admin.site.register(CourseMaterial)
admin.site.register(Enrollment)
admin.site.register(Schedule)
admin.site.register(Notification)
admin.site.register(Report)
admin.site.register(Payment)
admin.site.register(Plan)
admin.site.register(UserProfile)
admin.site.register(Subscription)
admin.site.register(UserSubscription)
