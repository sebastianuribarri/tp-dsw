#include <stdio.h>
#include <string.h>
#include <ctype.h>

#define MAX_LENGTH 100

// Función para verificar si una palabra es palíndromo
int esPalindromo(char palabra[]) {
    int longitud = strlen(palabra);
    printf("long %d \n", longitud);
    for (int i = 0; i < longitud / 2; i++) {
        if (palabra[i] != palabra[longitud - 1 - i]) {
            printf("p %c \n", palabra[i]);
            printf("c %c", palabra[longitud - 1 - i]);
            return 0; // No es palíndromo
        }
    }
    return 1; // Es palíndromo
}

int encontrarProxEspacio (char frase[], int n){
    for (int i = n; i < strlen(frase); i++){
       if (frase[i] == ' ') {
            return i;
        }
    }
    
}


// Función para imprimir la frase con la primera letra de cada palabra en mayúscula
void imprimirMayusculas(char frase[]) {
    int longitud = strlen(frase);
    int i = 0;
    while (i < longitud) {
        // Ignorar espacios en blanco
        while (i < longitud && frase[i] == ' ') {
            putchar(frase[i]);
            i++;
        }
        // Convertir a mayúscula la primera letra de la palabra
        if (i < longitud) {
            putchar(toupper(frase[i]));
            i++;
        }
        // Convertir a minúsculas el resto de la palabra
        while (i < longitud && frase[i] != ' ') {
            putchar(tolower(frase[i]));
            i++;
        }
    }
    printf("\n");
}

void mostrarMayusculas(char frase[]){
    int inicio = 0;
    
    while (inicio < strlen(frase)){ // para cada palabra
        // encuentra donde termina la palabra
        int espacio = encontrarProxEspacio(frase, inicio);
        
        // Convertir a mayúscula la primera letra de la palabra
        printf("%c", toupper(frase[inicio]));
        
        // Convertir a minúsculas el resto de la palabra
        for(int i=1; i <= espacio; i++){
            printf("%c", tolower(frase[inicio+i])); 
        }
        inicio = espacio + 1;
    }
    
}

void mostrarPalabraPorRenglon(char frase[]){
    for (int i = 0; i < strlen(frase); i++) {
        if (frase[i] == ' ') {
            printf("\n"); // Imprimir una nueva línea al encontrar un espacio
        } else {
            printf("%c", frase[i]); // Imprimir el carácter si no es un espacio
        }
    }
}

int main() {
    char frase[MAX_LENGTH];
    printf("Ingrese una frase: ");
    fgets(frase, MAX_LENGTH, stdin);
    
    // Extraer la segunda palabra
    char segundaPalabra[MAX_LENGTH];
    int espacio = encontrarProxEspacio(frase, 0);
    int inicio = espacio + 1;
    int i = 0;
    while(inicio + i < strlen(frase) - 1 && frase[inicio + i] != ' '){
        
        segundaPalabra[i] = frase[inicio + i];
        printf("%c", segundaPalabra[i]);
        
        i++;
    } 
    printf("aa");
    // Verificar si la segunda palabra es palíndromo
    if (esPalindromo(segundaPalabra)) {
        printf("La segunda palabra es %s y es un palindromo.\n", segundaPalabra);
    } else {
        printf("La segunda palabra es %s y no es un palindromo.\n", segundaPalabra);
    }
    
    // Imprimir la frase con la primera letra de cada palabra en mayúscula
    printf("Frase con la primera letra de cada palabra en mayuscula:\n");
    imprimirMayusculas(frase);  
    printf("Frase con la primera letra de cada palabra en mayuscula:\n");
    mostrarMayusculas(frase);  
    
    // Imprimir cada palabra en una línea
    printf("Cada palabra de la frase en un renglon:\n");
    
    mostrarPalabraPorRenglon(frase);
}
