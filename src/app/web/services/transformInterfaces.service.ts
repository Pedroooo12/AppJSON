import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransformInterfacesService {

constructor() { }

  jsonToInterface(json: any, interfaceName: string = 'Root'): string[] {
    const interfaceStrings: string[] = [];

    function parseObject(obj: any, interfaceName: string, indent: string = ''): void {
      let interfaceString = `export interface ${interfaceName} {`;
      interfaceString+= "<br>";
      const keys = Object.keys(obj);
      keys.forEach((key,index) => {
          const value = obj[key];
          const nestedInterfaceName = `${key.charAt(0).toUpperCase() + key.slice(1)}`;
          interfaceString += `<span class='ms-4'>${indent}  ${key}: ${typeof value === 'object' ? nestedInterfaceName : typeof value};\n</span>`;
          interfaceString+= "<br>";
          if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
              parseObject(value, nestedInterfaceName); // Ajustar la indentación aquí
          }
      });
      interfaceString += `${indent}}`;
      interfaceString += "<br>";
      interfaceString += "<br>";
      interfaceStrings.push(interfaceString.trim());
  }
    parseObject(json, interfaceName); 
    
    //eliiminar los últimos dos br
    const lastInterfaceStringIndex = interfaceStrings.length - 1;

    if(interfaceStrings.length > 1){
      const ultimo = interfaceStrings[lastInterfaceStringIndex];
      const primero = interfaceStrings[0];

      interfaceStrings[0] = ultimo;
      interfaceStrings[lastInterfaceStringIndex] = primero;

    }

    interfaceStrings[lastInterfaceStringIndex] = interfaceStrings[lastInterfaceStringIndex].replace(/<br><br>$/, ''); 
    return interfaceStrings;
  }

  downloadInterfaces(json: string, fileName: string): void {
    const blob = new Blob([json], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.endsWith('.ts') ? fileName : fileName + '.ts'; 
    a.click();
    window.URL.revokeObjectURL(url);
  }

  stringToInterface(json: string, interfaceName: string = 'Root'): string[] {
    const interfaceStrings: string[] = [];

    function parseObject(obj: any, interfaceName: string, indent: string = ''): void {
      let interfaceString = `export interface ${interfaceName} {`;
      interfaceString+= "<br>";
      const keys = Object.keys(obj);
      keys.forEach((key,index) => {
          const value = obj[key];
          const nestedInterfaceName = `${key.charAt(0).toUpperCase() + key.slice(1)}`;
          interfaceString += `<span class='ms-4'>${indent}  ${key}: ${typeof value === 'object' ? nestedInterfaceName : typeof value};\n</span>`;
          interfaceString+= "<br>";
          if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
              parseObject(value, nestedInterfaceName); // Ajustar la indentación aquí
          }
      });
      interfaceString += `${indent}}`;
      interfaceString += "<br>";
      interfaceString += "<br>";
      interfaceStrings.push(interfaceString.trim());
      
    }
    
    parseObject(JSON.parse(json), interfaceName); 
    
    //eliiminar los últimos dos br
    const lastInterfaceStringIndex = interfaceStrings.length - 1;
  


    if(interfaceStrings.length > 1){
      const ultimo = interfaceStrings[lastInterfaceStringIndex];
      const primero = interfaceStrings[0];

      interfaceStrings[0] = ultimo;
      interfaceStrings[lastInterfaceStringIndex] = primero;

    }

    interfaceStrings[lastInterfaceStringIndex] = interfaceStrings[lastInterfaceStringIndex].replace(/<br><br>$/, ''); 

    return interfaceStrings;
}

  prepareCopyText(interfaceStrings: string[]): string {
    let fullText = '';
    interfaceStrings.forEach(interfaceString => {
      // Reemplazar etiquetas HTML y clases CSS con un espacio para conservar la indentación
      const cleanedString = interfaceString.replace(/<[^>]+>/g, match => {
        // Si la coincidencia es una etiqueta de apertura o cierre, se reemplaza con un espacio
        return match.charAt(0) === '<' ? ' ' : '';
      });
      // Reemplazar el espacio al final de una línea después de '{' con un salto de línea
      const formattedString = cleanedString.replace(/{ /g, '{\n');
      // Reemplazar la llave '}' al final de una línea con un salto de línea y la llave al principio de la siguiente línea
      const finalFormattedString = formattedString.replace(/\s*}\s*(<\/br>)?$/gm, '\n\n}');

      // Eliminar el último salto de línea antes de '}'
      const trimmedString = finalFormattedString.replace(/\n(?=})/g, '');

      fullText += trimmedString + '\n\n';
    });
    // Eliminar espacios y saltos de línea sobrantes
    const cleanedText = fullText.trim();
    return cleanedText;
  }

  private llegaDelTextarea = new Subject<string>; 
  public llegaDelTextarea$ = this.llegaDelTextarea.asObservable();

  setLlegaTextoTextarea(data: string) {

    this.llegaDelTextarea.next(data);
  }
}
