# Generated by Django 4.0.2 on 2022-03-23 22:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('measurement', '0001_initial'),
        ('injection', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Meal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cho', models.IntegerField()),
                ('injection', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='injection.injection')),
                ('measurement', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='measurement.measurement')),
            ],
        ),
    ]
