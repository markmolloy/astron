//  modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from'@angular/forms';
import { AppComponent } from './app.component';
import { MatModule } from './mat/mat.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//  pipes

//  environment
import { environment } from '../environments/environment';

//  angularfire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// services / guards
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuard } from './services/admin.guard';

//  directives
import { ParallaxDirective } from './parallax.directive';
import { DropZoneDirective } from './drop-zone.directive';

//  components
import { HomeComponent } from './components/home/home.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileSizePipe } from './file-size.pipe';
import { SingleImagePredictionComponent } from './components/single-image-prediction/single-image-prediction.component';
import { LandingComponent } from './components/landing/landing.component';

//  routes
const appRoutes: Routes = [{ 
  path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'uploads', component: FileUploadComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ParallaxDirective,
    DropZoneDirective,
    FileUploadComponent,
    FileSizePipe,
    SingleImagePredictionComponent,
    LandingComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [ AuthService, AuthGuardService, AdminGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
