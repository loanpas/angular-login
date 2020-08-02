import { Component } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { AuthService } from "../services/auth.service";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private authService: AuthService, private alertCtrl: AlertController ) {}

  ngOnInit() {
  }

  /*-- método que permite desconectarse 
  logout() {
    this.authService.logout();
  }--*/

  async logout() { 
    
    const alertElement = await this.alertCtrl.create({
      header: 'Mensaje',
      message: 'Esta seguro de salir de iApp?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Salir',
          handler: ()=> {
            this.authService.logout();
          }
        }
      ]
    });

    await alertElement.present();
  }
}
