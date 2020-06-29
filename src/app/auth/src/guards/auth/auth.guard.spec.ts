import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services';
import SpyObj = jasmine.SpyObj;
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          RouterTestingModule
      ],
      providers: [
        {
          provide: AuthService,
          useFactory: () => {
            const authService: SpyObj<AuthService> = jasmine.createSpyObj('AuthService', ['isAuthenticated']);

            authService.isAuthenticated.and.returnValue(of(false));

            return authService;
          }
        }
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
