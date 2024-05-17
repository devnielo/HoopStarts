import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, inject, ChangeDetectionStrategy } from '@angular/core';
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
  hasThreeFavorites: boolean = false;

  @Output() searchQuery = new EventEmitter<string>();
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.favorites$.subscribe((favorites) => {
      this.hasThreeFavorites = favorites.length === 3;
    });
  }

  removeFavorite(player: Player): void {
    this.store.dispatch(PlayerActions.removeFavorite({ player }));
  }

  search(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchQuery.emit(query);
  }

  clearSearch(): void {
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
      this.searchQuery.emit('');
    }
  }
}
