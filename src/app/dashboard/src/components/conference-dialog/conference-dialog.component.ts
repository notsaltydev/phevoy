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
    @Input() startDate: Date;
    @Input() endDate: Date;
    @Input() description: string;
    form: FormGroup;
    times: string[];
    availableEndTimes: string[];

    constructor(
        protected ref: NbDialogRef<ConferenceDialogComponent>,
        private formBuilder: FormBuilder
    ) {
        this.times = times;
    }

    ngOnInit(): void {
        const initialStartTime: string = this.getTimeByDate(new Date());
        const initialEndTime: string = this.getTimeByDate(new Date());

        this.setEndTimeRange(this.times.indexOf(initialStartTime));

        this.form = this.formBuilder.group({
            name: new FormControl('', [Validators.required]),
            date: new FormControl(new Date(), [Validators.required]),
            startTime: new FormControl(initialStartTime, [Validators.required]),
            endTime: new FormControl(initialEndTime, [Validators.required]),
            description: new FormControl('')
        });

        this.form.get('startTime').valueChanges.subscribe((time: string) => {
            console.log('startTime', time);
            const selectedStartDateIndex: number = this.times.indexOf(time);

            this.setEndTimeRange(selectedStartDateIndex);
        });
    }

    getTimeByDate(date: Date): string {
        const minutes: number = 15 * Math.floor(date.getMinutes() / 15);
        const hours: number = date.getHours();

        return `${hours === 0 ? '00' : hours}:${minutes === 0 ? '00' : minutes}`;
    }

    setEndTimeRange(startIndex: number): void {
        this.availableEndTimes = this.times.slice(startIndex, this.times.length - 1);
    }

    save(): void {
        if (this.form.valid) {
            const {date, description, name, time} = this.form.value;
            const timeEntries: string[] = time.split(':');

            date.setHours(+timeEntries[0], +timeEntries[1], 0, 0);

            this.ref.close({
                name,
                date,
                description
            });
        }
    }

    dismiss(): void {
        this.ref.close();
    }
}