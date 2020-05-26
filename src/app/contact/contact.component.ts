import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
    contactForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.pattern('.+@.+\\..+')]),
        subject: new FormControl('', Validators.required),
        message: new FormControl('', Validators.required)
    });

    submitted = false;
    errors: string[] = [];
    messages: string[] = [];

    constructor(private cd: ChangeDetectorRef) {
    }

    sendContactMessage(): void {
        this.submitted = true;
        this.errors = this.messages = [];
        this.validateAllFormFields(this.contactForm);

        if (this.contactForm.valid) {
            this.errors = this.messages = [];
            this.submitted = true;

            setTimeout(() => {
                this.submitted = false;

                console.log('Thanks for your message', this.contactForm.value);

                this.contactForm.reset();
                this.cd.markForCheck();
            }, 2000);
        } else {
            this.submitted = false;

            console.log('Error!');
        }

        this.contactForm.updateValueAndValidity();
        this.cd.markForCheck();
    }

    private validateAllFormFields(formGroup: FormGroup): void {
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
