# Generated by Django 4.1.7 on 2023-06-11 22:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hps', '0008_alter_faq_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='faq',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]