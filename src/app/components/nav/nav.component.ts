import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  userLogin: User | null = null;
  activeMenu: boolean = false;
  counter: number = 0;

  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) { }

  login(){
    /* this.authService.login('andres@prueba.com','123456').subscribe(user => {
      this.token = user.access_token;
      this.getProfile();
    }); */
    this.authService.loginAndGet('andres@prueba.com','123456').subscribe(user => {
      this.userLogin = user;
    }
    );
  }

  getProfile(){
    this.authService.profile().subscribe(user => {
      this.userLogin = user;
    });
  }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

}
