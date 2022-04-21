# Generated by Django 4.0.4 on 2022-04-21 20:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pacient', '0005_pacient_carb_counting_pacient_isf'),
        ('insulin', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='insulin',
            name='dosis',
            field=models.DecimalField(decimal_places=2, max_digits=4, null=True),
        ),
        migrations.AddField(
            model_name='insulin',
            name='pacient',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='pacient.pacient'),
        ),
    ]
