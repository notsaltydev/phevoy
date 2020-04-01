import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturesComponent {
  form: FormGroup = new FormGroup({});
}
