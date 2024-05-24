import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebComponent } from './web/web.component';
import { FormComponent } from './web/dashboard/form/form.component';
import { DashboardComponent } from './web/dashboard/dashboard.component';
import { InicioComponent } from './web/inicio/inicio.component';
import { DocumentationComponent } from './web/documentation/documentation.component';

const routes: Routes = [
  {
    path: '',
    component: WebComponent,
    children: [
      {
        path: '',
        component: InicioComponent
      },
      {
        path: 'form',
        component: DashboardComponent
      },
      {
        path: 'doc',
        component: DocumentationComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
