# Generated by Django 4.0.2 on 2022-03-18 03:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('glicemy', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Measurement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField()),
                ('glicemy', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='glicemy.glicemy')),
            ],
        ),
    ]
