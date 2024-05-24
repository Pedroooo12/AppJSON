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

  private alertaSubscription!: Subscription;


  constructor(private transformInterfaceService: TransformInterfacesService, private fb: FormBuilder) {
    this.miFormulario = this.fb.group({
      // 1 campo valores, 2 campo validaciones sincronas, 3 campo validaciones asincronas
      interface_name:  ['', [Validators.required]],
    })
   }


  ngOnInit() {
    this.alertaSubscription = this.transformInterfaceService.llegaDelTextarea$.subscribe(data => {
      this.textoTextarea = data;

      this.interfaces = this.transformInterfaceService.stringToInterface(data);
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
      this.interfaces = this.transformInterfaceService.jsonToInterface(this.jsonObject);
    }
  }

  copyText(event: any) {
    event.preventDefault();
    navigator.clipboard.writeText(this.transformInterfaceService.prepareCopyText(this.interfaces)).then(() => {
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
    
    if(this.textoTextarea == ''){
      this.interfaces = this.transformInterfaceService.jsonToInterface(this.jsonObject, this.miFormulario.controls['interface_name'].value);
    }else{
      this.interfaces = this.transformInterfaceService.stringToInterface(this.textoTextarea, this.miFormulario.controls['interface_name'].value);
    }
    

    this.cambiaNombre = true;
    setTimeout(() => {
        this.cambiaNombre = false;
    }, 2500);

    this.miFormulario.reset();
  }

}
