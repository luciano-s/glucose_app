# Generated by Django 4.0.2 on 2022-04-03 02:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('measurement', '0002_alter_measurement_glicemy'),
    ]

    operations = [
        migrations.RenameField(
            model_name='measurement',
            old_name='glicemy',
            new_name='glycemia',
        ),
    ]
