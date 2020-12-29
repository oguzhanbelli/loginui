import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{
  public userData:any=[];

  constructor(private http: HttpClient,public toastController: ToastController) {
    
  }


login(username,password){
  console.log("UserName: "+username);
  console.log("Password: "+password);

  this.http.get("http://microwebservice.net/ecodation/webService.php?userName="+username+"&password="+password).subscribe(data => {

    if(data==0){
      console.log("Hata");
      this.presentToast("danger","Yanlış bilgi tekrar deneyiniz.");
    }else{
     this.userData= data[0];
     localStorage.setItem("userJSON",JSON.stringify(this.userData));
     this.presentToast("success","Hoşgeldiniz.");
    }
   
  })

}

async presentToast(renk,mesaj) {
  const toast = await this.toastController.create({
    message: 'Your settings have been saved.',
    duration: 2000
  });
  toast.present();
}
}

