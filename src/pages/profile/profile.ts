import {ChangeDetectorRef, Component, NgZone} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { Profile } from "../../models/profile";
import { AngularFireDatabase } from "angularfire2/database";
import { TabsPage } from "../tabs/tabs";
import {AuthProvider} from "../../providers/auth/auth";
import {ImgHandlerProvider} from "../../providers/img-handler/img-handler";
import {ProfilepicPage} from "../profilepic/profilepic";


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;
  avatar: string;
  profileData: Profile;

  constructor(  private afAuth: AngularFireAuth,
                private afDatabase: AngularFireDatabase,
                private cdRef: ChangeDetectorRef,
                public navCtrl: NavController,
                public navParams: NavParams,
                public authProvider: AuthProvider,
                public zone: NgZone,
                public alertCtrl: AlertController,
                public imgHandler: ImgHandlerProvider,) {
  }

  ionViewWillEnter() {
    this.loadUserDetails();
  }

  ionViewWillLoad() {
    this.afAuth.authState.take(1).subscribe(data => {
      this.afDatabase.object<Profile>(`profile/${data.uid}`).valueChanges().take(1).subscribe(p => {
        this.profileData = p;
        this.cdRef.detectChanges();
      })
    })
  }
  loadUserDetails() {
    this.authProvider.getUserDetails().then((res: any) => {
      this.zone.run(() => {
        this.avatar = res.photoURL;
      })
    })
  }

  createProfile(){
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
        .then(() => this.navCtrl.setRoot(TabsPage));
    })
  };

  /**editImage() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    this.imgHandler.uploadImage().then((url: any) => {
      this.authProvider.updateImage(url).then((res: any) => {
        if (res.success) {
          statusalert.setTitle('Updated');
          statusalert.setSubTitle('Your profile pic has been changed successfully!!');
          statusalert.present();
          this.zone.run(() => {
            this.avatar = url;
          })
        }
      }).catch((err) => {
        statusalert.setTitle('Failed');
        statusalert.setSubTitle('Your profile pic was not changed');
        statusalert.present();
      })
    })
  }*/

  editImage() {
    this.navCtrl.push('ProfilepicPage');
  }

}
