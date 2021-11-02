from django.contrib import admin

# Register your models here. para poder agregar datos
from .models import Categoria, Producto, User


@admin.register(Categoria)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    # creamos slugs por default usando el nombre
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Producto)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['nombreID', 'nombre', 'slug', 'price', 'in_stock', 'description', 'created',
                    'updated', 'popular']
    list_filter = ['in_stock', 'popular'] #podemos filtrar de manera facil asi
    list_editable = ['price', 'in_stock', 'popular']
    prepopulated_fields = {'slug': ('nombreID',)}
