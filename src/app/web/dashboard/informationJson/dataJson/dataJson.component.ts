import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime, fromEvent, map } from 'rxjs';
import { ChooseFileService } from 'src/app/web/services/chooseFile.service';
import { FormService } from 'src/app/web/services/form.service';
import { TransformInterfacesService } from 'src/app/web/services/transformInterfaces.service';

@Component({
  selector: 'app-dataJson',
  templateUrl: './dataJson.component.html',
  styleUrls: ['./dataJson.component.css']
})
export class DataJsonComponent implements OnInit, AfterViewInit, OnChanges {

  @Input()  jsonText: string = '';

  @ViewChild('textarea') textarea!: ElementRef;

  notValidJson: boolean = false;

  @Input() limpiarTodo: boolean = false;

  private debouncer: Subject<String> = new Subject<String>();
  constructor(private transformInterfacceService: TransformInterfacesService, private formService: FormService){

  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['limpiarTodo'] && changes['limpiarTodo'].currentValue) {
      this.limpiarTodo = changes['limpiarTodo'].currentValue;
      if(this.limpiarTodo){
        console.log(this.limpiarTodo);  
        this.jsonText = '';
        this.textarea.nativeElement.value='';
      }

    }
  }

  ngAfterViewInit(): void {
    fromEvent<Event>(this.textarea.nativeElement, 'input').pipe(
      debounceTime(500),
      map((event: Event) => (event.target as HTMLTextAreaElement).value)
    ).subscribe(value => {
      if(!this.formService.isValidJson(value)){
        this.notValidJson = true;
      }else if(this.formService.isValidJson(value) ){
        this.transformInterfacceService.setLlegaTextoTextarea(value);
      }

      if(value == ''){
        this.notValidJson = false;
      }
     
    });
  }

}
