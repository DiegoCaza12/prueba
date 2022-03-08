import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Team}from '../models/teams'
import {Team1}from '../models/teams1'
import {Team2}from '../models/teams2'

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  url :string ="http://localhost/prueba2/";
  url1 :string ="http://localhost/prueba1/";
  url2 :string ="http://localhost/prueba3/";
  constructor(public http:HttpClient) { }

  getTeams() {
    return this.http.get<Team[]>(this.url);
   }
   public addTeam(team:Team){
    const formData = new FormData()
    formData.append("nombre", team.nombre)
    formData.append("detalle", team.detalle)
    formData.append("precio", team.precio)
    return this.http.post(this.url, formData)
  }

  public deleteTeam(id:string){
    return this.http.delete(this.url+'?id='+id)
  }

  public getTeam(id:string){
    return this.http.get<Team>(this.url+'?id='+id)
  }

  public updateTeam(team:Team){
    return this.http.put(this.url, team)
  }


  getTeams1() {
    return this.http.get<Team1[]>(this.url1);
   }
   public addTeam1(team1:Team1){
    const formData = new FormData()
    formData.append("cedula", team1.cedula)
    formData.append("nombre", team1.nombre)
    formData.append("apellido", team1.apellido)
    formData.append("email", team1.email)
    formData.append("telefono", team1.telefono)
    formData.append("direccion", team1.direccion)
    return this.http.post(this.url1, formData)
  }

  public deleteTeam1(id:string){
    return this.http.delete(this.url1+'?id='+id)
  }

  public getTeam1(id:string){
    return this.http.get<Team1>(this.url1+'?id='+id)
  }

  public updateTeam1(team1:Team1){
    return this.http.put(this.url1, team1)
  }


  getTeams2() {
    return this.http.get<Team2[]>(this.url2);
   }
   public addTeam2(team2:Team2){
    const formData = new FormData()
    formData.append("cedula", team2.cedula)
    formData.append("nombre", team2.nombre)
    formData.append("apellido", team2.apellido)
    formData.append("email", team2.email)
    formData.append("telefono", team2.telefono)
    formData.append("direccion", team2.direccion)
    formData.append("usuario", team2.usuario)
    formData.append("clave", team2.clave)
    return this.http.post(this.url2, formData)
  }

  public deleteTeam2(id:string){
    return this.http.delete(this.url2+'?id='+id)
  }

  public getTeam2(id:string){
    return this.http.get<Team2>(this.url2+'?id='+id)
  }

  public updateTeam2(team2:Team2){
    return this.http.put(this.url2, team2)
  }
}