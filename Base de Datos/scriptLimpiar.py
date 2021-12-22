import csv
import random


def generarNumContacto(fields):

	numTel = ""
	numTelefonico = "6" #Que empiecen por 6

	for i in range(0,9):	
		numTel = numTel + str(random.randint(0,9))


	
	#Establecemos un dígito mas que lo normal en España para que no sean numeros reales de personas	(el objetivo es solo la funcionalidad del boton)
	
	numTelefonico = numTelefonico + numTel

	fields.append(numTelefonico)
	
	return fields




def generarVecesContactado(fields):


	fields.append(0) #los inicializo a cero 
	return fields









# seed random number generator
random.seed(1)

with open('BaseDatos.csv', 'r') as fuente, open('BaseDatosLimpia.csv', 'w') as salida:
	reader = csv.reader(fuente)
	writer = csv.writer(salida)
	counter = 0	
	fields = []
	saltoLinea = False

	for row in reader:
		fields = []
		saltoLinea = False
		counter = counter+1

		#print(row) #La fila entera
		#print(row[0]+"||"+row[1]+"||"+row[2]+"||"+row[3]+"||"+row[4]+"||"+row[5]+"||"+row[6]+"||"+row[7]+"||"+row[8]+"||"+row[9]+"||"+row[10]+"||"+row[11]+"||"+row[12]+"||"+row[13]+"||"+row[14]+"||"+row[15]+"||"+row[16]+"||"+row[17]+"||FIN") #Primer campo de la fila
		
		for i in range(0,17):
			fields.append(row[i])
			#print fields[i]

		if counter > 1: #si son las cabeceras no comprobamos campos porque están bien
			if(fields[4]==""):
				fields[4] = "No Financiado"
#			if(row[4]==""):
#				row[4]="VACIOOOOOOO"


			#print(fields[14].find(" "))
			if(fields[13].find(" ") == -1): #find retorna el índice de la cadena donde está el espacio y, si no hay  -1
				fields[13] = "No Disponible"
			
			#Cualquier otro campo que esté vacío anula la línea
			for field in fields:
				if(field == ""):
					saltoLinea = True
					print field+"linea anulada"

		else:
			#si son las cabeceras añado los dos campos nuevos
			fields.append("contact_num") #El separador de campo , no hace falta porque el writerow lo pone solo al detectar que escribe un vector como csv
			fields.append("contact_times")
			writer.writerow(fields)
			continue

		if(saltoLinea == True):
			continue
		
		fields = generarNumContacto(fields) #num telefono ficticio para funcionaliad de los anuncios
		fields = generarVecesContactado(fields) #inicializo a 0 el campo para su posterior uso		

#		writer.writerow(row)
		writer.writerow(fields)



		
	
