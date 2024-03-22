import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const adminToken = localStorage.getItem('token');
  if (!adminToken) {
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
