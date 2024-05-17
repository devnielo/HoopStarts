import { Routes } from '@angular/router';
import { PlayerListComponent } from './features/player-list/player-list.component';

export const routes: Routes = [
  { path: '', component: PlayerListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
