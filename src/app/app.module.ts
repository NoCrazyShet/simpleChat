import {NgModule, ErrorHandler, ChangeDetectorRef} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ChatsPage} from '../pages/chats/chats';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireModule } from "angularfire2";
import { firebaseConfig } from "./credentials";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { ProfilePage } from "../pages/profile/profile";
import { ImgHandlerProvider } from '../providers/img-handler/img-handler';

//Native files
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { HombresPage } from "../pages/hombres/hombres";


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    ChatsPage,
    TabsPage,
    ProfilePage,
    HombresPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    ChatsPage,
    TabsPage,
    ProfilePage,
    HombresPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ImgHandlerProvider,
    FilePath,
    FileChooser,
    File,

  ]
})
export class AppModule {}
