import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackComponent {
    feedbackForm: FormGroup = new FormGroup({
        name: new FormControl(''),
        subject: new FormControl(''),
        message: new FormControl('', Validators.required)
    });

    submitted = false;
    errors: string[] = [];
    messages: string[] = [];
    feedback: any = {};

    constructor(private cd: ChangeDetectorRef) {
    }

    sendFeedback(): void {
        this.submitted = true;
        this.errors = this.messages = [];
        this.validateAllFormFields(this.feedbackForm);

        if (this.feedbackForm.valid) {
            this.errors = this.messages = [];
            this.submitted = true;

            setTimeout(() => {
                this.submitted = false;

                console.log('Thanks for your feedback', this.feedbackForm.value);

                this.cd.markForCheck();
            }, 2000);
        } else {
            this.submitted = false;

            console.log('Error!');
        }

        this.feedbackForm.updateValueAndValidity();
        this.cd.markForCheck();
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control: AbstractControl = formGroup.get(field);

            if (control instanceof FormControl) {
                control.markAsDirty({onlySelf: true});
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
}
