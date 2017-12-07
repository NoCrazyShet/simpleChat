import {  Component } from '@angular/core';
import {  IonicPage,
          NavController,
          NavParams,
          Alert,
          AlertController,
          Loading,
          LoadingController} from 'ionic-angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

import {  EmailValidator } from '../../validators/email';
import {  AuthProvider } from "../../providers/auth/auth";
import {  ChatsPage } from '../chats/chats'
import {  TabsPage} from "../tabs/tabs";
import {  ProfilePage } from "../profile/profile";
import {  Profile } from "../../models/profile";
import {  AngularFireDatabase } from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public authProvider: AuthProvider,
              private afDatabase: AngularFireDatabase,
              formBuilder: FormBuilder) {

    this.loginForm = formBuilder.group ({
      email: [
        '', Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        '', Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  goToSignup():void {
    this.navCtrl.push('SignupPage');
  }

  goToResetPassword():void {
    this.navCtrl.push('ResetPasswordPage');
  }

  loginUser(): void{
    if (!this.loginForm.valid) {
      console.log('Form is not valid yet, current value: ${this.loginForm.value}');
    } else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authProvider.loginUser(email, password).then(
        authData => {
          this.afDatabase.object<Profile>(`profile/${authData.uid}`).valueChanges().subscribe(p => {

            this.loading.dismiss().then(() => {
              if (p){
                this.navCtrl.setRoot(TabsPage);
              } else {
                this.navCtrl.setRoot(ProfilePage);
              }
            });
          });

        },
        error => {
          this.loading.dismiss().then (() => {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{text: 'Ok', role: 'cancel'}]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
