import { Injectable } from '@angular/core';
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Router } from '@angular/router';

import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase';
import { User } from "../model/user";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = [
    {
      id: 1,
      username: 'usuario1@softcapla.com',
      password: '123456',
      photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4qa9jdjGSgT3NneUZbb_ZDatEgB8GCz2WjQ&usqp=CAU'
    },
    {
      id: 2,
      username: 'usuario2@softcapla.com',
      password: '123456',
      photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR7wm7pw6FOvkrTwQ70xhwvCIOLhjLrv3OBVA&usqp=CAU'
    },
    {
      id: 3,
      username: 'usuario3@softcapla.com',
      password: '123456',
      photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSe4aCtpcIOvQt5OJRQvexPSUZSsxF1Ool3qA&usqp=CAU'
    },
    {
      id: 4,
      username: 'usuario4@softcapla.com',
      password: '123456',
      photoURL: 'https://cdn2.upsocl.com/wp-content/uploads/immujer/2015/05/o-KRISTEN-STEWART-facebook-728x4111.jpg'
    },
    {
      id: 5,
      username: 'usuario5@softcapla.com',
      password: '123456',
      photoURL: 'https://image.freepik.com/foto-gratis/retrato-estudio-expresion-sonrisa-cara-personas-adultas_53876-45363.jpg'
    }
  ]

  constructor(

    private google: GooglePlus,
    private AFauth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private facebook: Facebook) {

  }

  /*-- método que permite loguearse --*/
  login(email: string, password: string) {
    return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password)
        .then(user => { resolve(user); })
        .catch(error => rejected(error));
    });
  }

  /*-- método que permite obtener todos los usuarios --*/
  getUsers() {
    return [...this.users]
  }

  /*-- método que permite obtener usuario [ id ] --*/
  getUserById(id: number) {
    return {
      ...this.users.find(user => {
        return user.id === id
      })
    }
  }

  /*-- método que permite obtener usuario [ email ] --*/
  getUserByUserName(username: string) {
    return {
      ...this.users.find(user => {
        return user.username === username
      })
    }
  }

  /*-- método que permite obtener usuario [ email, password ] --*/
  getUserByUserNameAndPassword(username: string, password: string) {
    return {
      ...this.users.find(user => {        
        return user.username === username && user.password === password
      })
    }
  }

  /*-- método que permite registrar un usuario --*/
  registerUser(username: string, password: string, photoURL: string) {
    this.users.push({
      id: this.users.length + 1,
      username,
      password,
      photoURL
    });
  }

  /*-- método que permite eliminar un usuario --*/
  deteleUsers(id: number) {
    this.users = this.users.filter(user => {
      return user.id !== id
    })
  }

  /*-- método que permite desconectarse --*/
  logout() {
    this.AFauth.auth.signOut()
      .then(() => {
        this.google.disconnect();
        this.facebook.logout();
        this.router.navigate(['/login']
        );
      })
  }

  /*-- método que permite registrar un usuario en firebase --*/
  register(email: string, password: string, name: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then(res => {
        const uid = res.user.uid;
        this.db.collection('users').doc(uid).set({
          name: name,
          uid: uid
        })
        resolve(res)
      }).catch(err => reject(err))
    })
  }

  /*-- método para loguearme con google --*/
  loginWithGoogle() {
    return this.google.login({})
      .then(result => {
        const user_data_google = result;
        console.log(user_data_google);
        return this.AFauth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(null, user_data_google.accessToken));
      })
  }

  /*-- método para loguearme con facebook --*/
  loginWithFacebook() {
    return this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      const credential_facebook = auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
      return this.AFauth.auth.signInWithCredential(credential_facebook);
    })
  }
}