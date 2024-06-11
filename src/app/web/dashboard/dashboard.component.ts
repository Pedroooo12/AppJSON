import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  limpiarTodo: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  limpiar(){
    this.limpiarTodo = true;
    
    setTimeout(() => {
      this.limpiarTodo = false;
    }, 1000);
  }

  textareaChange(argumento: boolean){
    console.log(argumento)
    return argumento;
  }

  formChange(argumento: boolean){
    console.log(argumento);
    return argumento;
  }

}
