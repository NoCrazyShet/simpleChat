import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";


@IonicPage()
@Component({
  selector: 'page-hombres',
  templateUrl: 'hombres.html',
})
export class HombresPage {

  temparr = [];
  filteredusers = [];

  constructor(  public navCtrl: NavController,
                public navParams: NavParams,
                public authProvider: AuthProvider) {

  this.authProvider.getAllUsers().then((res: any) => {
    this.filteredusers = res;
    this.temparr = res;
  })
  }

  //search Users
  searchUser(searchbar){
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }
    this.filteredusers = this.filteredusers.filter((v) => {
      if (v.username.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HombresPage');
  }

}
