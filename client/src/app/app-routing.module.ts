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
import { CreateBuildingComponent } from './components/create-building/create-building.component';
import { CreateDepartamentComponent } from './components/create-departament/create-departament.component';
import { SuperadminguardGuard } from './guards/superadmin/superadminguard.guard';
import { AdminGuard } from './guards/admin/adminguard.guard';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { CreateUserBuildComponent } from './components/create-user-build/create-user-build.component';
import { ListUsersBuildComponent } from './components/list-users-build/list-users-build.component';
import { AdminUserGuard } from './guards/adminuser/admin-user.guard';
import { AssignResidentComponent } from './components/assign-resident/assign-resident.component';

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
    canActivate: [AdminGuard],
    data: {animation: 'Residente'}
  },
  {
    path: 'listaVisitas',
    component: ListVisitsComponent,
    canActivate: [AdminUserGuard],
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
    canActivate: [AdminGuard],
    data: {animation: 'ListaPersona'}
  },
  {
    path: 'crearEdificios',
    component: CreateBuildingComponent,
    canActivate: [SuperadminguardGuard],
    data: {animation: 'crearEdificio'}
  },
  {
    path: 'crearDepartamentos',
    component: CreateDepartamentComponent,
    canActivate: [SuperadminguardGuard],
    data: {animation: 'crearDepartamento'}
  },
  {
    path: 'crearUsuarioAdmin',
    component: CreateUserComponent,
    canActivate: [SuperadminguardGuard],
    data: {animation: 'crearUserAdmin'}
  },
  {
    path: 'crearConserjes',
    component: CreateUserBuildComponent,
    canActivate: [AdminGuard],
    data: {animation: 'crearConserje'}
  },
  {
    path: 'listaUsuariosEdificio',
    component: ListUsersBuildComponent,
    canActivate: [AdminGuard],
    data: {animation: 'listaUsuarioEdificio'}
  },
  {
    path: 'asignarResidentes',
    component: AssignResidentComponent,
    canActivate: [AdminGuard],
    data: {animation: 'asignarResidente'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
