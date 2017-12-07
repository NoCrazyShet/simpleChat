import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { Profile } from "../../models/profile";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {

  profileData: Profile;


  constructor(private afAuth: AngularFireAuth,
              private afDatabase: AngularFireDatabase,
              private toast: ToastController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController) {

  }

  ionViewWillLoad() {
    let loading = this.loadingCtrl.create({content: `Please Wait`});
    loading.present();
    this.afAuth.authState.take(1).subscribe(data => {
      if (data && data.email && data.uid){
        this.toast.create({
          message: `Welcome to simpleChat, ${data.email}`,
          duration: 1
        }).present();

        this.afDatabase.object<Profile>(`profile/${data.uid}`).valueChanges().take(1).subscribe(p => {
          this.profileData = p;
          loading.dismiss();
        });
      }
      else {
        this.toast.create({
          message: `Could not find authentication details.`,
          duration:1,
        }).present();
      }
    })
  }

  addBuddy() {
    this.navCtrl.push('HombresPage');
  }
}

