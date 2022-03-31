import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from './models/user.model';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  token = '';
  userLogin: User = {
    id: '',
    email: '',
    name: '',
    password: ''
  }
  imgRta: string = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService,
  ){
  }

  onLoaded(img: string){
    console.log('log padre', img);
  }

  createUser(){
    this.usersService.create({
      email: 'andres@prueba.com',
      name: 'Andres',
      password: '123456'
    }).subscribe(user => {
      console.log('user', user);
    });
  }

  login(){
    this.authService.login('andres@prueba.com', '123456').subscribe(user => {
      this.token = user.access_token;
      this.getProfile();
    });
  }

  getProfile(){
    this.authService.profile().subscribe(user => {
      this.userLogin = user;
    });
  }

  downloadPDF(){
    this.filesService.getFile('my-PDF', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf').subscribe();
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.filesService.uploadFile(file).subscribe(res => {
        this.imgRta = res.location;
      });
  }
  }

}
