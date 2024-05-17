import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { playerReducer } from './app/core/store/player.reducer';
import { PlayerEffects } from './app/core/store/player.effects';
import { routes } from './app/routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideStore({ players: playerReducer }),
    provideEffects([PlayerEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ],
}).catch(err => console.error(err));
