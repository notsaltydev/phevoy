import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const times: string[] = Array(24 * 4).fill(0).map((_, i) => {
    return ('0' + Math.floor(i / 4) + ':0' + 60 * (i / 4 % 1)).replace(/\d(\d\d)/g, '$1');
});

@Component({
    selector: 'app-conference-dialog',
    templateUrl: './conference-dialog.component.html',
    styleUrls: ['./conference-dialog.component.scss']
})
export class ConferenceDialogComponent implements OnInit {
    @Input() title: string;
    @Input() name: string;
    @Input() date: Date;
    @Input() description: Date;
    form: FormGroup;
    times: string[] = times;

    constructor(
        protected ref: NbDialogRef<ConferenceDialogComponent>,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: new FormControl(this.name || '', [Validators.required]),
            date: new FormControl(this.date || new Date(), [Validators.required]),
            time: new FormControl(this.getTimeByDate(new Date()), [Validators.required]),
            description: new FormControl('')
        });
    }

    getTimeByDate(date: Date): string {
        const minutes: number = 15 * Math.floor(date.getMinutes() / 15);
        const hours: number = date.getHours();

        return `${hours === 0 ? '00' : hours}:${minutes === 0 ? '00' : minutes}`;
    }

    save(): void {
        if (this.form.valid) {
            const {date, description, title, time} = this.form.value;
            const timeEntries: string[] = time.split(':');

            date.setHours(+timeEntries[0], +timeEntries[1], 0, 0);

            this.ref.close({
                title,
                date,
                description
            });
        }
    }

    dismiss(): void {
        this.ref.close();
    }
}
