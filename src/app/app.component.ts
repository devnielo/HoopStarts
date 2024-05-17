import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/header/header.component';
import { PlayerListComponent } from './features/player-list/player-list.component';
import { Store } from '@ngrx/store';
import * as PlayerActions from './core/store/player.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, CommonModule, HeaderComponent, PlayerListComponent],
})
export class AppComponent {
  @ViewChild(PlayerListComponent) playerList!: PlayerListComponent;
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  showConfetti = false;
  showPopup = false;

  constructor(private store: Store) {}

  handleRevealSecret(): void {
    this.showConfetti = true;
    this.showPopup = true;
    setTimeout(() => {
      this.showConfetti = false;
    }, 5000); // Confetti animation duration
  }

  handlePlayAgain(): void {
    this.store.dispatch(PlayerActions.removeAllFavorites());
    this.showPopup = false;
    this.playerList.filteredPlayers = this.playerList.displayedPlayers;
    this.headerComponent.clearSearch();
  }

  handleClosePopup(): void {
    this.showPopup = false;
  }
}
