import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicios/acceso.service';
import {Team}from '../models/teams';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  id = ''
  bandera = false
  isUpdate = false
  team:Team = {nombre:'', detalle:'', precio:''}
  ListTeam:Team []

  constructor(public apiService:AccesoService,
              public toastController: ToastController,
              public alertController: AlertController) { 
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
    this.apiService.getTeams().subscribe(
      (response) => { 
        this.ListTeam = response
       },
      (error) => { console.log(error) })
  }
  public save():void{
    if(this.isUpdate){
      this.apiService.updateTeam(this.team).subscribe(
        (response) => { 
           this.presentToast(response)
           this.clearInput()
           this.LoadTeam()
           this.isUpdate = false
         },
        (error) => { console.log(error) }) 

    }else{
      this.apiService.addTeam(this.team).subscribe(
        (response) => { 
           this.presentToast(response)
           this.clearInput()
           this.LoadTeam()
         },
        (error) => { console.log(error) })  
    }
    
   }
   
  public delete():void{
    this.apiService.deleteTeam(this.id).subscribe(
      (response) => { 
         this.presentToast(response)
         this.LoadTeam()
       },
      (error) => { console.log(error) })
  }

   public getId(id:string):void{
     this.id = id
     this.presentAlertConfirm()
   }

   public getTeam(id:string):void{
    this.apiService.getTeam(id).subscribe(
      (response) => { 
        const {id, nombre, detalle, precio} = response
        this.team.id = id 
        this.team.nombre = nombre
        this.team.detalle = detalle
        this.team.precio = precio
        this.isUpdate = true
        this.bandera = true
       },
      (error) => { console.log(error) })
   }

   public clearInput():void{
     this.team.nombre = '';
     this.team.detalle = '';
     this.team.precio = '';
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
