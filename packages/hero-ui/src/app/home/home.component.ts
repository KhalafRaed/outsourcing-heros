import { Component } from '@angular/core'
import { NavComponent } from './nav/nav.component'
import { AllHeroesComponent } from './all-heroes/all-heroes.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent, AllHeroesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
