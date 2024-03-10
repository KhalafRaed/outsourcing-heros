import { Injectable } from '@angular/core'
import { State } from '@ngxs/store'
import { HeroesStateModel } from '../../shared/types/state'

@State<HeroesStateModel>({
  name: 'heroes',
  defaults: {
    heroes: [],
    loading: true,
    error: undefined,
  },
})
@Injectable()
export class HeroesState {}
