import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TransformInterfacesService } from 'src/app/web/services/transformInterfaces.service';

@Component({
  selector: 'app-interfacesJson',
  templateUrl: './interfacesJson.component.html',
  styleUrls: ['./interfacesJson.component.css']
})
export class InterfacesJsonComponent implements OnInit, OnDestroy, OnChanges {

  @Input()  jsonText: string = '';

  textoTextarea: string = '';

  interfaces: string[] = [];

  jsonObject: any;

  miFormulario: FormGroup;

  cambiaNombre: boolean = false;

  interfazCopiada: boolean = false;

  valorNombreInterfaz: string = '';

  private alertaSubscription!: Subscription;

  @Input() limpiarTodo: boolean = false;


  constructor(private _transformInterfaceService: TransformInterfacesService, private fb: FormBuilder) {
    this.miFormulario = this.fb.group({
      // 1 campo valores, 2 campo validaciones sincronas, 3 campo validaciones asincronas
      interface_name:  ['Root', [Validators.required]],
    })
   }


  ngOnInit() {
    this.alertaSubscription = this._transformInterfaceService.llegaDelTextarea$.subscribe(data => {
      this.textoTextarea = data;

      this.interfaces = this._transformInterfaceService.stringToInterface(data);
    });
  }

  ngOnDestroy(): void {
    if(this.alertaSubscription){
      console.log("desuscribirse");
      this.alertaSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('jsonText' in changes && this.jsonText != '') {
      const newData = changes["jsonText"].currentValue;

      this.jsonObject = JSON.parse(newData);
      this.interfaces = this._transformInterfaceService.jsonToInterface(this.jsonObject);
    }

    if (changes['limpiarTodo'] && changes['limpiarTodo'].currentValue) {
      this.limpiarTodo = changes['limpiarTodo'].currentValue;
      if(this.limpiarTodo){
        console.log(this.limpiarTodo);  
        this.jsonText = '';
        this.interfaces = [];
      }
    }
  }

  downloadFile(){
    this._transformInterfaceService.downloadInterfaces(this.jsonObject, this.valorNombreInterfaz || 'Root');
  }

  copyText(event: any) {
    event.preventDefault();
    navigator.clipboard.writeText(this._transformInterfaceService.prepareCopyText(this.interfaces)).then(() => {
      console.log('Texto copiado al portapapeles');
      this.interfazCopiada = true;
      setTimeout(() => {
        this.interfazCopiada = false;
      }, 3000); // Mostrar el mensaje de éxito durante 3 segundos
    }).catch((error) => {
      console.error('Error al copiar al portapapeles: ', error);
    });
  }

  validacion(arg:string){
    return this.miFormulario.controls[`${arg}`].errors && this.miFormulario.controls[`${arg}`].touched;
  }

  enviar(){
    if(this.miFormulario.invalid){
      //va campo por campo y toca todo el formulario
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);

    this.valorNombreInterfaz = this.miFormulario.controls['interface_name'].value;
    
    if(this.textoTextarea == ''){
      this.interfaces = this._transformInterfaceService.jsonToInterface(this.jsonObject, this.valorNombreInterfaz);
    }else{
      this.interfaces = this._transformInterfaceService.stringToInterface(this.textoTextarea, this.valorNombreInterfaz);
    }
    

    this.cambiaNombre = true;
    setTimeout(() => {
        this.cambiaNombre = false;
    }, 2500);

    this.miFormulario.reset();
  }

}
