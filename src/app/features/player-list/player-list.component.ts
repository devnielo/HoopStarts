import { Component, OnInit, HostListener, ChangeDetectorRef, ChangeDetectionStrategy, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Player } from '../../core/models/player';
import * as PlayerActions from '../../core/store/player.actions';
import { selectAllPlayers, selectFavorites } from '../../core/store/player.selectors';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerListComponent implements OnInit {
  private store = inject(Store);
  private cdr = inject(ChangeDetectorRef);
  players$: Observable<Player[]> = this.store.pipe(select(selectAllPlayers));
  favorites$: Observable<Player[]> = this.store.pipe(select(selectFavorites));
  displayedPlayers: Player[] = [];
  allPlayers: Player[] = [];
  filteredPlayers: Player[] = [];
  loading = true;
  offset = 0;
  limit = 22;
  skeletonArray: number[] = Array.from({ length: 20 }, (_, i) => i);
  disableSelection = false;
  searchQuery: string = '';

  @Output() clearSearch = new EventEmitter<void>();

  ngOnInit(): void {
    console.log('Component initialized');
    this.players$.subscribe((players) => {
      console.log('Players from store (ngOnInit):', players.length, players);
      this.allPlayers = players;
      if (this.allPlayers.length === 0) {
        this.loadPlayers();
      } else {
        this.loadMorePlayers();
        this.loading = false;
        this.cdr.detectChanges();
        console.log('Loading state:', this.loading);
      }
    });

    this.favorites$.subscribe((favorites) => {
      this.disableSelection = favorites.length >= 3;
      this.cdr.detectChanges();
    });
  }

  loadPlayers(): void {
    console.log('Loading players');
    this.store.dispatch(PlayerActions.loadPlayers());
  }

  loadMorePlayers(): void {
    const nextOffset = this.offset + this.limit;
    const nextBatch = this.allPlayers.slice(this.offset, nextOffset);
    this.displayedPlayers = [...this.displayedPlayers, ...nextBatch];
    this.filteredPlayers = this.displayedPlayers;
    this.offset = nextOffset;
    this.loading = false;
    this.cdr.detectChanges();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 &&
      !this.loading
    ) {
      console.log('Scrolled to bottom. Loading more players...');
      this.loadMorePlayers();
    }
  }

  togglePlayerSelection(player: Player): void {
    this.favorites$.pipe(take(1)).subscribe((favorites) => {
      if (favorites.some((fav) => fav.id === player.id)) {
        this.store.dispatch(PlayerActions.removeFavorite({ player }));
      } else if (favorites.length < 3) {
        this.store.dispatch(PlayerActions.addFavorite({ player }));
        this.clearSearch.emit();
        this.filteredPlayers = this.displayedPlayers;
        this.searchQuery = '';
      }
    });
  }

  removeFavorite(player: Player): void {
    this.store.dispatch(PlayerActions.removeFavorite({ player }));
  }

  isSelected(player: Player): Observable<boolean> {
    return this.favorites$.pipe(
      map((favorites) => favorites.some((fav) => fav.id === player.id))
    );
  }

  trackByPlayer(player: Player): number {
    return player.id;
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    if (query.length > 1) {
      this.filteredPlayers = this.displayedPlayers.filter(player =>
        player.name.toLowerCase().includes(query)
      );
    } else {
      this.filteredPlayers = this.displayedPlayers;
    }
    this.cdr.detectChanges();
  }
}
