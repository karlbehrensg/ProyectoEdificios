import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { VisitComponent } from './components/create-visit/visit.component';
import { AuthGuard } from './guards/logIn/auth.guard';
import { UserGuard } from './guards/user/user.guard';
import { Shipment } from './models/shipment';
import { CreateShipmentComponent } from './components/create-shipment/create-shipment.component';
import { CreatePersonComponent } from './components/create-person/create-person.component';
import { ListVisitsComponent } from './components/list-visits/list-visits.component';
import { ListShipmentsComponent } from './components/list-shipments/list-shipments.component';
import { ListPersonBuildComponent } from './components/list-person-build/list-person-build.component';

const routes: Routes = [
  {
    path: '', 
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {animation: 'Login'}
  },
  {
    path: 'registrarVisita', 
    component: VisitComponent,
    canActivate: [UserGuard],
    data: {animation: 'Visita'}
  },
  {
    path: 'registrarEncomienda',
    component: CreateShipmentComponent,
    canActivate: [UserGuard],
    data: {animation: 'Encomienda'}
  },
  {
    path: 'registrarPersona',
    component: CreatePersonComponent,
    canActivate: [UserGuard],
    data: {animation: 'Residente'}
  },
  {
    path: 'listaVisitas',
    component: ListVisitsComponent,
    canActivate: [UserGuard],
    data: {animation: 'ListaVisita'}
  },
  {
    path: 'listaEncomiendas',
    component: ListShipmentsComponent,
    canActivate: [UserGuard],
    data: {animation: 'ListaEncomienda'}
  },
  {
    path: 'listaPersonas',
    component: ListPersonBuildComponent,
    canActivate: [UserGuard],
    data: {animation: 'ListaPersona'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
