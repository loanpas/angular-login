import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController } from "@ionic/angular";
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  users: User;
  private flogin: FormGroup;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder) { 

      this.flogin = this.formBuilder.group({
        username : ['', [Validators.required]],
        password : ['', [Validators.required]],
      });
    }

  ngOnInit() {    
  }
  
  /*-- iniciar sesión --*/
  goToLogIn(username, password) {

    this.users = this.authService.getUserByUserNameAndPassword(username.value, password.value);
    if(this.users.id != null) {
      this.router.navigate(['/home']);
    } else {
      this.userErrorMessage();
    }
    /*
    .sub( resp => {
      this.router.navigate(['/home']);
    }).catch(error => {
      this.userErrorMessage()
    })*/    
  }

  /*-- iniciar sesión con facebook --*/
  goToFacebook() {
    this.authService.loginWithFacebook().then( resp => {
      this.router.navigate(['/home']);
    }).catch(error => {
      this.connectionErrorMessage()
    })    
  }

  /*-- iniciar sesión con google --*/
  goToGoogle() {
    this.authService.loginWithGoogle().then(() => {
      this.router.navigate(['/home']);
    }).catch(error => {      
      this.connectionErrorMessage()
    })    
  }

  async connectionErrorMessage() { 
    
    const alertElement = await this.alertCtrl.create({
      header: 'Error',      
      message: 'Problemas iniciando app.',
      buttons: ['OK']
    });

    await alertElement.present();
  }

  async userErrorMessage() { 
    
    const alertElement = await this.alertCtrl.create({
      header: 'Error',      
      message: 'Usuario/contraseña inválidos.',
      buttons: ['OK']
    });

    await alertElement.present();
  }  
}
