import { Injectable } from '@angular/core';
import { ChooseFileService } from './chooseFile.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {
 

  jsonContent: any = null;
  jsonText: string = '';
  errorMessage: string = '';

  constructor( private chooseFileService: ChooseFileService) { }

  // onJsonTextChange(newText: string): void {
  //   try {
  //     this.jsonContent = JSON.parse(newText);
  //     this.jsonText = JSON.stringify(this.jsonContent, null, 2);
  //     this.chooseFileService.setAlertasData(this.jsonText);
  //     console.log('JSON content updated');
  //   } catch (e) {
  //     console.error('Error al parsear el JSON:', e);
  //     this.errorMessage = 'El contenido del JSON no es válido.';
  //   }
  // }
  
}
