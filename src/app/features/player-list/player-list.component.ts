import { Component, OnInit, HostListener, signal, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../core/services/player.service';
import { Player } from '../../core/models/player';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerListComponent implements OnInit {
  private playerService = inject(PlayerService);
  players = signal<Player[]>([]);
  displayedPlayers = signal<Player[]>([]);
  selectedPlayers = signal<Set<Player>>(new Set<Player>());
  offset = signal(0);
  limit = 100;
  loading = signal(false);

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    if (this.loading()) return;
    this.loading.set(true);
    this.playerService.getPlayers().subscribe(allPlayers => {
      this.players.set(allPlayers);
      this.loadMorePlayers();
      this.loading.set(false);
    });
  }

  loadMorePlayers(): void {
    const currentLength = this.displayedPlayers().length;
    const newBatch = this.players().slice(currentLength, currentLength + this.limit);
    this.displayedPlayers.update(players => [...players, ...newBatch]);
  }

  togglePlayerSelection(player: Player): void {
    const currentSelection = this.selectedPlayers();
    if (currentSelection.has(player)) {
      currentSelection.delete(player);
    } else if (currentSelection.size < 3) {
      currentSelection.add(player);
    }
    this.selectedPlayers.set(new Set(currentSelection));
  }

  isSelected(player: Player): boolean {
    return this.selectedPlayers().has(player);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
      this.loadMorePlayers();
    }
  }
}
