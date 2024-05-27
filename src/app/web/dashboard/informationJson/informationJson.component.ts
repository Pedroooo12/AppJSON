import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { Subscription } from 'rxjs';
import { ChooseFileService } from '../../services/chooseFile.service';

@Component({
  selector: 'app-informationJson',
  templateUrl: './informationJson.component.html',
  styleUrls: ['./informationJson.component.css']
})
export class InformationJsonComponent implements OnInit, OnDestroy {

 

  private jsonText: string = '';

  @Input() limpiarTodo: boolean = false;

  private alertaSubscription!: Subscription;

  constructor( private chooseFileService: ChooseFileService) { }

  ngOnInit() {
    this.alertaSubscription = this.chooseFileService.alertaFile$.subscribe(data => {
      console.log(data);
      this.jsonText = data;
    });
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
