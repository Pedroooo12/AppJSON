import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChooseFileService } from '../../services/chooseFile.service';

@Component({
  selector: 'app-informationJson',
  templateUrl: './informationJson.component.html',
  styleUrls: ['./informationJson.component.css']
})
export class InformationJsonComponent implements OnInit, OnDestroy {

  @Output() textareaChange = new EventEmitter<boolean>();
 

  private jsonText: string = '';

  @Input() limpiarTodo: boolean = false;

  private alertaSubscription!: Subscription;

  constructor( private chooseFileService: ChooseFileService) { 
    this.onTextareaChange();
  }

  ngOnInit() {
    this.alertaSubscription = this.chooseFileService.alertaFile$.subscribe(data => {

      this.jsonText = data;
      this.onTextareaChange();
    });
  }

  onTextareaChange() {

    this.textareaChange.emit(false);
  }

  get getjsonText(){
    return this.jsonText;
  }

  ngOnDestroy(): void {
    if(this.alertaSubscription){
      console.log("desuscribirse");
      this.alertaSubscription.unsubscribe();
    }
  }


}
