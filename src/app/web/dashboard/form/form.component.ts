import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { ChooseFileService } from '../../services/chooseFile.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  jsonText = '';
  jsonContent: any;

  

  errorFormato: boolean = false;

  constructor(public formService: FormService, private chooseFileService: ChooseFileService) { }

  ngOnInit() {
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Verificar el tipo de archivo
      if (file.type !== 'application/json') {
          input.value = '';
          this.errorFormato = true;
          setTimeout(() => {
            this.errorFormato = false;
          }, 2500);
        return;
      }

      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          const jsonText = e.target.result as string;

          try {
            this.onJsonTextChange(jsonText);
          } catch (error) {
            console.error('Error al parsear el JSON:', error);
          }
        }
      };

      reader.readAsText(file);
    }
  }

  onJsonTextChange(newText: string): void {
    try {
      this.jsonContent = JSON.parse(newText);
      this.jsonText = JSON.stringify(this.jsonContent, null, 2);
      this.chooseFileService.setAlertasData(this.jsonText);
      console.log('JSON content updated');
    } catch (e) {
      console.error('Error al parsear el JSON:', e);
    }
  }


}
