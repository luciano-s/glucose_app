# Generated by Django 4.0.2 on 2022-04-03 02:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pacient', '0003_alter_pacient_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='pacient',
            name='max_glucose_level',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='pacient',
            name='min_glucose_level',
            field=models.IntegerField(null=True),
        ),
    ]