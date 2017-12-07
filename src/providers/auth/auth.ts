import {Injectable} from '@angular/core';
import * as firebase from "firebase";
import { AngularFireAuth } from "angularfire2/auth";
import { Profile } from "../../models/profile";


@Injectable()
export class AuthProvider {

  firedata = firebase.database().ref(`/profile/`);


  constructor(public afireAuth: AngularFireAuth,) {}


  //login users
  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  //sign up new users
  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        firebase
          .database()
          .ref(`/userProfile/${newUser.uid}/email`)
          .set(email);
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  //Reset user password
  resetPassword(email : string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  //Log users out
  logoutUser(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref(`/userProfile/${userId}`)
        .off();
    return firebase.auth().signOut();
  }

  //Filter and search users
  getAllUsers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) =>{
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  //Update image
  updateImage(imageurl) {
    var promise = new Promise((resolve, reject) => {
      this.afireAuth.auth.currentUser.updateProfile({
        displayName: this.afireAuth.auth.currentUser.displayName,
        photoURL: imageurl
      }).then(() => {
        firebase.database().ref('/profile/' + firebase.auth().currentUser.uid).update({
          displayName: this.afireAuth.auth.currentUser.displayName,
          photoURL: imageurl,
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  //retrieve the users' data
  getUserDetails(){
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }


}
