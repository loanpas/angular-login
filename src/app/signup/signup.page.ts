import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor( private route: Router ) { }

  ngOnInit() {
  }

  /*-- registrar --*/
  goToSignup() {
    console.log('registrar');
  }

  /*-- registrar con facebook --*/
  goToRegisterFacebook() {
    console.log('registrar con facebook');
  }

  /*-- registrar con google --*/
  goToRegisterGoogle() {
    console.log('registrar con google');
  }

  /*-- registrar con twitter --*/
  goToRegisterTwitter() {
    console.log('registrar con twitter');
  }
}
