import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Player } from '../../core/models/player';
import { selectFavorites } from '../../core/store/player.selectors';
import { Observable } from 'rxjs';
import * as PlayerActions from '../../core/store/player.actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private store = inject(Store);
  favorites$: Observable<Player[]> = this.store.pipe(select(selectFavorites));

  ngOnInit(): void {}

  removeFavorite(player: Player): void {
    this.store.dispatch(PlayerActions.removeFavorite({ player }));
  }

  search(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    console.log('Search query:', query);
  }
}
