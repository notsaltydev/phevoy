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
        const initialStartTime: string = this.startDate ? this.getTimeByDate(this.startDate) : this.getTimeByDate(new Date());
        const initialEndTime: string = this.endDate ?
            this.getTimeByDate(this.endDate) :
            this.getTimeWithGap(this.times.indexOf(initialStartTime));

        this.setEndTimeRange(this.times.indexOf(initialStartTime));

        this.form = this.formBuilder.group({
            name: new FormControl(this.name || '', [Validators.required]),
            date: new FormControl(new Date(), [Validators.required]),
            startTime: new FormControl(initialStartTime, [Validators.required]),
            endTime: new FormControl(initialEndTime, [Validators.required]),
            description: new FormControl(this.description || '')
        });

        this.form.get('startTime').valueChanges.subscribe((time: string) => {
            const selectedStartDateIndex: number = this.times.indexOf(time);

            this.setEndTimeRange(selectedStartDateIndex);
            this.maybeSetEndTime();
        });
    }

    getTimeByDate(date: Date): string {
        const minutes: string = ('0' + date.getMinutes()).replace(/\d(\d\d)/g, '$1');
        const hours: string = ('0' + date.getHours()).replace(/\d(\d\d)/g, '$1');

        return `${hours}:${minutes}`;
    }

    setEndTimeRange(startIndex: number): void {
        this.availableEndTimes = this.times.slice(startIndex, this.times.length);
    }

    save(): void {
        if (this.form.valid) {
            const {date, description, endTime, name, startTime} = this.form.value;
            const startTimeEntries: string[] = startTime.split(':');
            const endTimeEntries: string[] = endTime.split(':');
            const startDate: Date = new Date(date);
            const endDate: Date = new Date(date);

            startDate.setHours(+startTimeEntries[0], +startTimeEntries[1], 0, 0);
            endDate.setHours(+endTimeEntries[0], +endTimeEntries[1], 0, 0);

            this.ref.close({
                name,
                startDate,
                endDate,
                description
            });
        }
    }

    dismiss(): void {
        this.ref.close();
    }

    private maybeSetEndTime(): void {
        const startTime: string[] = this.form.get('startTime').value.split(':');
        const endTimeEntries: string[] = this.form.get('endTime').value.split(':');

        if (
            Math.floor(+startTime[0]) > Math.floor(+endTimeEntries[0]) ||
            (
                Math.floor(+startTime[0]) === Math.floor(+endTimeEntries[0]) &&
                Math.floor(+startTime[1]) > Math.floor(+endTimeEntries[1])
            )
        ) {
            const startTimeIndex: number = this.times.indexOf(this.form.get('startTime').value);
            const newEndTime: string = this.getTimeWithGap(startTimeIndex);

            this.form.get('endTime').setValue(newEndTime);
        }
    }

    private getTimeWithGap(index): string {
        let timeGap: string;

        if (index === this.times.length - 1) {
            console.log('-1');
            timeGap = this.times[this.times.length - 1];
        } else if (index === this.times.length - 2) {
            console.log('-2');
            timeGap = this.times[this.times.length - 2];
        } else {
            timeGap = this.times[index + 2];
        }

        return timeGap;
    }
}
