import {Component, NgZone} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { ImgHandlerProvider } from "../../providers/img-handler/img-handler";
import {AuthProvider} from "../../providers/auth/auth";
import {TabsPage} from "../tabs/tabs";
import auth from "firebase";

@IonicPage()
@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
})
export class ProfilepicPage {

  imgurl = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
  moveon = true;

  constructor(  public navCtrl: NavController,
                public navParams: NavParams,
                public imgService: ImgHandlerProvider,
                public zone : NgZone,
                public authProvider: AuthProvider,
                public loadingCtrl: LoadingController) {
  }


  chooseImage() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.imgService.uploadImage().then((uploadedurl: any) => {
      loader.dismiss();
      this.zone.run(() => {
        this.imgurl = uploadedurl;
        this.moveon = false;
      })
    })
  }

  updateProceed() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.authProvider.updateImage(this.imgurl).then((res: any) => {
      loader.dismiss();
      if (res.success) {
        this.navCtrl.setRoot(TabsPage);
      }
      else {
        alert(res);
      }
    })
  }

  proceed() {
    this.navCtrl.setRoot(TabsPage);
  }

}
