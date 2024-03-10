import { Component } from '@angular/core'
import { UserType } from '../../shared/types/user'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { SortFilterPipe } from '../../shared/pipes/sort-filter.pipe'

@Component({
  selector: 'app-all-heroes',
  standalone: true,
  imports: [CommonModule, FormsModule, SortFilterPipe],
  templateUrl: './all-heroes.component.html',
  styleUrl: './all-heroes.component.scss',
})
export class AllHeroesComponent {
  filterValue = ''
  sortBy: 'powerName' | 'email' = 'email'

  users: UserType[] = [
    {
      email: 'us111123er1@example.com',
      powerName: 'Po123wer1',
      rating: 4,
    },
    {
      email: '444user2@example.com',
      powerName: 'Powe123r2',
      rating: 3.5,
    },
    {
      email: 'use123r3@example.com',
      powerName: 'Pow123er3',
      rating: 5,
    },
    // Add more users as needed
  ]

  toggleSortKey() {
    this.sortBy = this.sortBy === 'email' ? 'powerName' : 'email'
  }
}
