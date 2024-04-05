import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminLoggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const adminToken =
    (typeof localStorage !== 'undefined' && localStorage.getItem('token')) ||
    null;
  if (adminToken) {
    router.navigate(['']);
    return false;
  } else {
    return true;
  }
};
