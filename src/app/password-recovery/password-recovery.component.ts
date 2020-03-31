import {ChangeDetectionStrategy, Component } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordRecoveryComponent {
  form: FormGroup = new FormGroup({});

  onSubmit(): void {
    console.log('Password recovery in progress...');
  }
}
