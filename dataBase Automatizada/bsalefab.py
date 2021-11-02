"""
Limpia los archivos y obten lo necesario de tus datos para poder realizar todo tu trabajo de forma automatizada

$ python bsalefab.py NOMBREARCHIVO

-f es para dar de input un fichero que deseamos filtrar y modificar
$ python bsalefab.py -f NOMBREARCHIVO
    > generara de output un fichero .csv para mayor modificacion

-l es para cargar la interfaz visual y buscar codigos SKU
    [*] implementar esto, jeje (implementado)

-o es la opcion para leer los SKU de un fichero, por ejemplo si obtienes todo de noviembre
    [] implementar esto, ahora se esta trabajndo en el jupyter
"""
import pandas as pd

# Que necesita el codigo?
# 1-----[] tomar input de que fichero le pedimos
# 2-----[] saber que hacer con este fichero
# 2.a----------  seleccionar las propiedades necesarias y crear otra DF con mejores nombres y documentacion

# 1 ---------------------
import sys
import getopt

opts, args = getopt.getopt(sys.argv[1:], "f:l:", ["excel","leer"])

#flags para los modos del script
FILTRAR, LEER = False, False
PIPE = False #sirve para usar un fichero como el input de los SKU
debug = True

for opt, arg in opts:
    if opt == "-f":
        filename = arg
        FILTRAR = True
        break # el programa solo necesita funcionar en un  modo
    if opt == "-l":
        filename = arg
        LEER = True
        break
    if opt == "-o":
        filenameSKU = arg
        PIPE = True
        break
    
print(f"Estas trabajando con el fichero de nombre : {filename}")
if FILTRAR: print("Estas usando el modo filtrado")
if LEER: print("Estas usando el modo leer")

# --------------------- 1]
if PIPE:
    from datetime import date

    today = date.today()

    # dd/mm/YY
    d1 = today.strftime("%d-%m-%Y")
    filename = "excel originales sept/update_octubre_fin.csv"
    df = pd.read_csv(filename)

    rowProd = df['Producto']
    rowSKU = df['SKU']

    # Esta DataBase solo contiene nombre y SKU
    db = pd.DataFrame()
    db['Producto'] = rowProd
    db['SKU'] = rowSKU
    db = db.dropna()
    db.to_csv(f"output{d1}.csv")
    # y asi obtenemos la lista de los SKU
    skuLista = list(db['SKU'])
    NstrSKU = len(skuLista)
    strSKU = ",".join(skuLista)
    if debug:
        print("los SKU obtenidos en el string son:")
        print(strSKU)
        print("--------- un numero de ----------")
        print(len(skuLista))


# ----------- Seccion de Filtrado de Fichero
if FILTRAR:
    wb = xl.load_workbook(filename)
    # df = pd.read_csv(filename)
    # print(df)
    print(wb)
    print("modo filtrar")
    print("Work in Progress por cierto xD")
    # yeah

# ---------- Seccion de Lectura -----------
if LEER:
    df = pd.read_csv(filename, index_col=0)  
    print(df)

    print("----------------------------------")
    print("Buscas algun producto? o lista de SKU?")
    print("Te dare ordenado el nombre y precio:")
    print("Separa varios SKU por comas: 3218, 312445, 12313")
    searchSKU = list(map(lambda x: x.strip(), input().split(",")))
    #strip borra los espacios en blanco de los numeros
    N_sku = len(searchSKU)
    if N_sku < 1:
        print('Un problema con el input ha ocurrido, esto es lo que tiene actualmente:')
        print(searchSKU)

    print(df.columns)
    print(df.iloc[1])
    # buscoSKU = 34080716
    # print(buscoSKU)
    # encontrados = df[buscoSKU]
    # print("Esto es lo que he encontrado")
    # print(encontrados)