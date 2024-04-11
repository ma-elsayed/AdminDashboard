import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { UsersService } from './services/users.service';
import { Chart } from 'chart.js';

export const appConfig: ApplicationConfig = {
  providers: [
    UsersService,
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideClientHydration(),
  ],
};
