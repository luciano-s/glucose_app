# Generated by Django 4.0.4 on 2022-04-21 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meal', '0004_alter_meal_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='meal',
            name='obs',
            field=models.TextField(null=True, verbose_name='Meal description'),
        ),
    ]
