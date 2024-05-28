import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
 

  jsonContent: any = null;
  jsonText: string = '';
  errorMessage: string = '';

  constructor() { }

  isValidJson(jsonString: string): boolean {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }

  formatJson(json: any, indent: number = 4): string {
    const parsedJson = JSON.parse(json);
    const formattedJson = JSON.stringify(parsedJson, null, 4);
    return formattedJson;
  }
  
}
