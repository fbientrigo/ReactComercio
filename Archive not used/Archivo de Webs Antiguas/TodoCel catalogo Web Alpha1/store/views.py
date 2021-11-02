from django.shortcuts import render, get_object_or_404

# Create your views here. aqui es donde veremos todo conectado

from .models import Categoria, Producto

def categories(request):
    return {
        'categories': Categoria.objects.all()
    }



def all_products(request):
    """ User pide por todos los productos """
    products = Producto.objects.all() #query en la DB de productos
    #aqui nos entrega la template pre preparada
    return render(request, 'store/home.html', {"products": products})

def product_detail(request, slug):
    product = get_object_or_404(Producto, slug=slug, in_stock=True)
    return render(request, 'store/products/single.html', {"product": product})

def categoria_list(request, categoria_slug):
    categoria = get_object_or_404(Categoria, slug=categoria_slug)
    products = Producto.objects.filter(categoria=categoria)
    return render(request, 'store/products/category.html', {"categoria": categoria, 'products':products})
    
     
