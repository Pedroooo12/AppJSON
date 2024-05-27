import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime, fromEvent, map } from 'rxjs';
import { ChooseFileService } from 'src/app/web/services/chooseFile.service';
import { FormService } from 'src/app/web/services/form.service';
import { TransformInterfacesService } from 'src/app/web/services/transformInterfaces.service';

@Component({
  selector: 'app-dataJson',
  templateUrl: './dataJson.component.html',
  styleUrls: ['./dataJson.component.css']
})
export class DataJsonComponent implements OnInit, AfterViewInit {

  @Input()  jsonText: string = '';

  @ViewChild('textarea') textarea!: ElementRef;

  notValidJson: boolean = false;

  private debouncer: Subject<String> = new Subject<String>();
  constructor(private transformInterfacceService: TransformInterfacesService, private formService: FormService){

  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    fromEvent<Event>(this.textarea.nativeElement, 'input').pipe(
      debounceTime(500),
      map((event: Event) => (event.target as HTMLTextAreaElement).value)
    ).subscribe(value => {
      // Aquí puedes hacer lo que necesites con el valor del textarea

      if(!this.formService.isValidJson(value)){
        this.notValidJson = true;
      }else if(this.formService.isValidJson(value) || value == ''){
        this.notValidJson = false;
      }
      
      console.log("cambio textarea" + value);
      this.transformInterfacceService.setLlegaTextoTextarea(value);
    });
  }

}
