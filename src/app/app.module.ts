import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/*-- firebase config --*/
import { AngularFirestoreModule } from "@angular/fire/firestore"; //BD
import { AngularFireAuthModule } from "@angular/fire/auth"; //módulo de autentucación.
import { AngularFireModule } from "@angular/fire"; //módulo para inicializar y que todo funcione bien.
import { environment } from "../environments/environment"; //variable de configuración.

import { GooglePlus } from "@ionic-native/google-plus/ngx";

import { Facebook } from '@ionic-native/facebook/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment),   
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    Facebook,
    GooglePlus,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
