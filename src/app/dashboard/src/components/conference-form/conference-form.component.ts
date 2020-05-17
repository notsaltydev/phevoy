import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Conference } from '../../models';

const times: string[] = Array(24 * 4).fill(0).map((_, i) => {
    return ('0' + Math.floor(i / 4) + ':0' + 60 * (i / 4 % 1)).replace(/\d(\d\d)/g, '$1');
});

@Component({
    selector: 'app-conference-form',
    templateUrl: './conference-form.component.html',
    styleUrls: ['./conference-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConferenceFormComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input() name: string;
    @Input() startDate: Date;
    @Input() endDate: Date;
    @Input() description: string;
    @Output() valueChanged: EventEmitter<Conference> = new EventEmitter<Conference>();
    @Output() isValid: EventEmitter<boolean> = new EventEmitter<boolean>();
    form: FormGroup;
    times: string[] = times;
    availableEndTimes: string[];
    private subscription: Subscription = new Subscription();

    constructor(
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        const startDate: Date = this.startDate || new Date();
        const initialStartTime: string = this.startDate ? this.getTimeByDate(this.startDate) : this.getTimeByDate(this.getRoundedDate(15));
        const initialEndTime: string = this.endDate ?
            this.getTimeByDate(this.endDate) :
            this.getTimeWithGap(this.times.indexOf(initialStartTime));

        this.setEndTimeRange(this.times.indexOf(initialStartTime));

        this.form = this.formBuilder.group({
            name: new FormControl(this.name || '', [Validators.required]),
            date: new FormControl(startDate, [Validators.required]),
            startTime: new FormControl(initialStartTime, [Validators.required]),
            endTime: new FormControl(initialEndTime, [Validators.required]),
            description: new FormControl(this.description || '')
        });

        this.form.get('startTime').valueChanges.subscribe((time: string) => {
            const selectedStartDateIndex: number = this.times.indexOf(time);

            this.setEndTimeRange(selectedStartDateIndex);
            this.maybeSetEndTime();
        });

        this.subscription.add(this.form.valueChanges.subscribe((changes: Conference) => {
            this.valueChanged.emit(changes);
            this.isValid.emit(this.form.valid);
        }));
    }

    registerOnChange(fn: any): void {
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(obj: any): void {
    }

    getTimeByDate(date: Date): string {
        const minutes: string = ('0' + date.getMinutes()).replace(/\d(\d\d)/g, '$1');
        const hours: string = ('0' + date.getHours()).replace(/\d(\d\d)/g, '$1');

        return `${hours}:${minutes}`;
    }

    setEndTimeRange(startIndex: number): void {
        this.availableEndTimes = this.times.slice(startIndex, this.times.length);
    }

    getRoundedDate(minutes, date = new Date()): Date {
        const ms: number = 1000 * 60 * minutes;
        return new Date(Math.round(date.getTime() / ms) * ms);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
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
            timeGap = this.times[this.times.length - 1];
        } else if (index === this.times.length - 2) {
            timeGap = this.times[this.times.length - 2];
        } else {
            timeGap = this.times[index + 2];
        }

        return timeGap;
    }

}
