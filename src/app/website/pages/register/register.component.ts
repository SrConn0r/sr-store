import { Component, OnInit } from '@angular/core';
import { OnExit } from '../../../guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {

  constructor() { }

  onExit() {
    const rta = confirm('¿Está seguro que desea salir?');
    return rta;
  }

}
