# Generated by Django 4.0.2 on 2022-04-06 11:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meal', '0002_meal_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meal',
            name='cho',
            field=models.DecimalField(decimal_places=2, max_digits=6, null=True),
        ),
    ]