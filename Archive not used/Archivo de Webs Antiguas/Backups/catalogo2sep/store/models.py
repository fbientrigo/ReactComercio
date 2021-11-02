from django.db import models
from django.contrib.auth.models import User #en caso de tener mas usuarios de la data base
from django.urls import reverse


class User(models.Model):
    """ Usuario que agrega el producto a la base de datos"""
    name = models.CharField(max_length=255, unique=True)


#Creamos las clases para nuestra base de datos
class Categoria(models.Model):
    """Las categorias de nuestros productos"""
    
    #nombre de las categorias
    name = models.CharField(max_length=255, db_index=True)
    # web/slugfield/  -> y accederemos a las categorias, solo hay una URL por eso unique
    slug = models.SlugField(max_length=255, unique=True)

    class Meta:
        verbose_name_plural = "categories"

    def get_absolute_url(self):
        return reverse('store:categoria_list', args=[self.slug])
        
    def __str__(self):  #entrega el nombre de la categoria
        return self.name

#Conectaremos nuestros productos a nuestras categorias
class Producto(models.Model):
    """La Base de Dato de Nuestros Productos"""

    #link hacia la tabla de categorias; CASCADE es si borramos una categoria para borrar todos los productos 
    # categoria es la union, necesita un default para no permitir nulls ; default='0'
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name="product") #nombre del producto
    slug = models.SlugField(max_length=255)

    nombreID = models.CharField(max_length=255, unique=True) #nombre unico tipo identificador
    nombre = models.CharField(max_length=255) #nombre popular
    image = models.ImageField(upload_to='images/') #aqui a donde se suben las imagenes
    price = models.IntegerField() #el precio
    in_stock = models.BooleanField(default=True)

    description = models.TextField(blank=True)

    created = models.DateTimeField(auto_now_add=True) #cuando se agrego a la base de datos, solo se modifica una vez
    #created_by = models.ForeignKey(User, related_name="product_creator", default='root') #quien creo el producto
    updated = models.DateTimeField(auto_now= True) #al modificar un producto, se puede modificar varias veces

    #pensaba agregar cuantos se venden por mes para sumarle bases de datos
    popular = models.BooleanField(default=False) #el producto es popular este mes?

    
    class Meta:
        verbose_name_plural = 'Productos'
        ordering = ('-price',) #se ordena por precio
    
    def __str__(self):
        return self.nombreID
    
    def get_absolute_url(self):
        return reverse('store:product_detail', args=[self.slug])
    


    