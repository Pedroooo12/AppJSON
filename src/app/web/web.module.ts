import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebComponent } from './web.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { FormComponent } from './dashboard/form/form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationJsonComponent } from './dashboard/informationJson/informationJson.component';
import { DataJsonComponent } from './dashboard/informationJson/dataJson/dataJson.component';
import { InterfacesJsonComponent } from './dashboard/informationJson/interfacesJson/interfacesJson.component';
import { DocumentationComponent } from './documentation/documentation.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    WebComponent,
    HeaderComponent,
    FormComponent,
    DashboardComponent,
    InformationJsonComponent,
    DataJsonComponent,
    InterfacesJsonComponent,
    DocumentationComponent
  ],
  exports: [WebComponent]
})
export class WebModule { }
