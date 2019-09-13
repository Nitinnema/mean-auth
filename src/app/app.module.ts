import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatExpansionModule,
  MatButtonModule,
  MatSelectModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatGridListModule,
  MatSidenavModule,
  MatIconModule,
  MatSnackBarModule,
  MatTabsModule} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserLoginComponent } from './authorisation/userlogin/userlogin.component';
import { AddUserComponent } from './adduser/adduser.component';
import { UserHomeComponent } from './userhome/userhome.component';
import { HttpClientModule } from '@angular/common/http';
import { CitiesComponent } from './cities/cities.component';
import { CustomModule } from './customModule/customModule.module';
import { AuthGuard } from './services/authguard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserLoginComponent,
    AddUserComponent,
    UserHomeComponent,
    CitiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatIconModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSidenavModule,
    DragDropModule,
    MatTabsModule,
    // CustomModule imports here not in decleretion because it is module not component
    CustomModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
