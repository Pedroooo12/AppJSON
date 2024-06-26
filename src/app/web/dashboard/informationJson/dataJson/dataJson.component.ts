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

  constructor(private transformInterfacceService: TransformInterfacesService, private formService: FormService){

  }

  ngOnInit(): void {

  }

  formatear(){
    this.textarea.nativeElement.value = this.formService.formatJson(this.textarea.nativeElement.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['limpiarTodo'] && changes['limpiarTodo'].currentValue) {
      this.limpiarTodo = changes['limpiarTodo'].currentValue;
      if(this.limpiarTodo){
        this.jsonText = '';
        this.textarea.nativeElement.value='';
      }
    }

    if(changes['jsonText']){
      console.log(changes['jsonText'].currentValue);
      this.jsonText = changes['jsonText'].currentValue;
      if(this.textarea){
        this.textarea.nativeElement.value = this.jsonText;
      }
    }
  }

  ngAfterViewInit(): void {
    fromEvent<Event>(this.textarea.nativeElement, 'input').pipe(
      debounceTime(700),
      map((event: Event) => (event.target as HTMLTextAreaElement).value)
    ).subscribe(value => {
      if(this.formService.isValidJson(value) == false){
        this.notValidJson = true;
      }else{
        this.notValidJson = false;
      }
      
      if(this.formService.isValidJson(value) ){
        this.transformInterfacceService.setLlegaTextoTextarea(value);
      }

      if(value == ''){
        this.notValidJson = false;
      }
     
    });
  }

}
