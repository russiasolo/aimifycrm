# Generated by Django 4.2 on 2023-05-19 06:19

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0004_alter_coursecrm_cr_description_alter_coursecrm_st_id"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="contactscrm",
            name="st_id",
        ),
        migrations.RemoveField(
            model_name="coursecrm",
            name="st_id",
        ),
        migrations.AlterField(
            model_name="contactscrm",
            name="ct_number",
            field=models.CharField(max_length=20),
        ),
    ]