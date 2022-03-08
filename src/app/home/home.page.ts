import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicios/acceso.service';
import {Team2}from '../models/teams2';
import { NavController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  id = ''
  bandera = false
  isUpdate = false
  team2:Team2 = {cedula: '', nombre: '', apellido: '', email: '', telefono: '', direccion: '',usuario: '',clave: ''}
  ListTeam:Team2 []

  constructor(public apiService:AccesoService,
    public toastController: ToastController,
    public alertController: AlertController,
    
    ) { 
this.LoadTeam();

}

  ngOnInit() {
  }
  public openAndCloseModal():void{
    this.bandera = !this.bandera
    this.isUpdate = false
    this.clearInput()
}

  public LoadTeam():void{
    this.apiService.getTeams2().subscribe(
      (response) => { 
        this.ListTeam = response
       },
      (error) => { console.log(error) })
  }
  public save():void{
    if(this.isUpdate){
      this.apiService.updateTeam2(this.team2).subscribe(
        (response) => { 
           this.presentToast(response)
           this.clearInput()
           this.LoadTeam()
           
           this.isUpdate = false
         },
        (error) => { console.log(error) }) 

    }else{
      this.apiService.addTeam2(this.team2).subscribe(
        (response) => { 
           this.presentToast(response)
           this.clearInput()
           this.LoadTeam()
         },
        (error) => { console.log(error) })  
    }
    
   }
   
  public delete():void{
    this.apiService.deleteTeam2(this.id).subscribe(
      (response) => { 
         this.presentToast(response)
         this.LoadTeam()
       },
      (error) => { console.log(error) })
  }

   public getId2(id:string):void{
     this.id = id
     this.presentAlertConfirm()
   }

   public getTeam2(id:string):void{
    this.apiService.getTeam2(id).subscribe(
      (response) => { 
        const {id,cedula, nombre, apellido,email, telefono,direccion,usuario,clave} = response
        this.team2.id = id 
        this.team2.cedula = cedula
        this.team2.nombre = nombre
        this.team2.apellido = apellido
        this.team2.email = email
        this.team2.telefono = telefono
        this.team2.direccion = direccion
        this.team2.usuario = usuario
        this.team2.clave = clave
        this.isUpdate = true
        this.bandera = true
       },
      (error) => { console.log(error) })
   }

   public clearInput():void{
     this.team2.cedula = '';
     this.team2.nombre = '';
     this.team2.apellido = '';
     this.team2.email = '';
     this.team2.telefono = '';
     this.team2.direccion = '';
     this.team2.usuario = '';
     this.team2.clave = '';
   }

   async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación',
      message: '<strong>Desea Eliminar</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            return false;
          }
        }, {
          text: 'Ok',
          handler: () => {
           this.delete()
          }
        }
      ]
    });

    await alert.present();
  }


   async presentToast(message) {
    const toast = await this.toastController.create({
      message:message.msg ,
      duration: 2000,
      color:"primary"
    });
    toast.present();
   }

}
