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

  isValidJson(jsonString: string): boolean {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }
  
}
