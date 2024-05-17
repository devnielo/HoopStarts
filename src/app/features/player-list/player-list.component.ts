// src/app/features/player-list/player-list.component.ts
import { Component, OnInit, HostListener, signal, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../core/services/player.service';
import { Player } from '../../core/models/player';
import { toSignal } from '@angular/core/rxjs-interop';
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
  searchQuery = signal('');
  loading = signal(false);

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    if (this.loading()) return;
    this.loading.set(true);
    this.playerService.getPlayers().subscribe(newPlayers => {
      this.players.set([...this.players(), ...newPlayers]);
      console.log(this.players());
      this.loading.set(false);
    });
  }
}
