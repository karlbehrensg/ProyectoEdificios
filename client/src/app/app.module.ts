import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './components/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VisitComponent } from './components/create-visit/visit.component';
import { CreatePersonComponent } from './components/create-person/create-person.component';
import { CreateShipmentComponent } from './components/create-shipment/create-shipment.component';
import { Ng2Rut, RutValidator } from 'ng2-rut';
import { ListVisitsComponent } from './components/list-visits/list-visits.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListShipmentsComponent } from './components/list-shipments/list-shipments.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackConfirmationComponent } from './components/snack-confirmation/snack-confirmation.component';
import { ListPersonBuildComponent } from './components/list-person-build/list-person-build.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxMaskModule } from 'ngx-mask';
import { IConfig } from 'ngx-mask';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { CreateBuildingComponent } from './components/create-building/create-building.component';
import { CreateDepartamentComponent } from './components/create-departament/create-departament.component';
import { CreateUserBuildComponent } from './components/create-user-build/create-user-build.component';
import { ListUsersBuildComponent, DialogListAuth } from './components/list-users-build/list-users-build.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddComment } from './components/list-visits/add-comment/add-comment.component';
import { DialogListComment } from './components/list-visits/list-comment/list-comment.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VisitComponent,
    CreatePersonComponent,
    CreateShipmentComponent,
    ListVisitsComponent,
    ListShipmentsComponent,
    SnackConfirmationComponent,
    ListPersonBuildComponent,
    CreateUserComponent,
    CreateBuildingComponent,
    CreateDepartamentComponent,
    CreateUserBuildComponent,
    ListUsersBuildComponent,
    DialogListAuth,
    DialogAddComment,
    DialogListComment
  ],
  imports: [
    NgxMaskModule.forRoot(options),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatListModule,
    Ng2Rut,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [RutValidator],
  bootstrap: [AppComponent],
  entryComponents: [CreatePersonComponent, SnackConfirmationComponent, DialogListAuth, DialogAddComment, DialogListComment],
})
export class AppModule { }
