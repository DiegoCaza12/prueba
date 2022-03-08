import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicios/acceso.service';
import {Team1}from '../models/teams1';
import { NavController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  id = ''
  bandera = false
  isUpdate = false
  team1:Team1 = {cedula:'',nombre:'',apellido:'',email:'', telefono:'', direccion:''}
  ListTeam:Team1 []

  constructor(public apiService:AccesoService,
    public toastController: ToastController,
    public alertController: AlertController,
    public router:Router
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
    this.apiService.getTeams1().subscribe(
      (response) => { 
        this.ListTeam = response
       },
      (error) => { console.log(error) })
  }
  public save():void{
    if(this.isUpdate){
      this.apiService.updateTeam1(this.team1).subscribe(
        (response) => { 
           this.presentToast(response)
           this.clearInput()
           this.LoadTeam()
           
           this.isUpdate = false
         },
        (error) => { console.log(error) }) 

    }else{
      this.apiService.addTeam1(this.team1).subscribe(
        (response) => { 
           this.presentToast(response)
           this.clearInput()
           this.LoadTeam()
         },
        (error) => { console.log(error) })  
    }
    
   }
   
  public delete():void{
    this.apiService.deleteTeam1(this.id).subscribe(
      (response) => { 
         this.presentToast(response)
         this.LoadTeam()
       },
      (error) => { console.log(error) })
  }

   public getId1(id:string):void{
     this.id = id
     this.presentAlertConfirm()
   }

   public getTeam1(id:string):void{
    this.apiService.getTeam1(id).subscribe(
      (response) => { 
        const {id,cedula, nombre, apellido,email, telefono,direccion} = response
        this.team1.id = id 
        this.team1.cedula = cedula
        this.team1.nombre = nombre
        this.team1.apellido = apellido
        this.team1.email = email
        this.team1.telefono = telefono
        this.team1.direccion = direccion
        this.isUpdate = true
        this.bandera = true
       },
      (error) => { console.log(error) })
   }

   public clearInput():void{
     this.team1.cedula = '';
     this.team1.nombre = '';
     this.team1.apellido = '';
     this.team1.email = '';
     this.team1.telefono = '';
     this.team1.direccion = '';
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
