import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

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

    constructor(
        protected ref: NbDialogRef<ConferenceDialogComponent>
    ) {
    }

    ngOnInit(): void {
    }

    save(): void {
        // if (this.form.valid) {
        //     const {date, description, endTime, name, startTime} = this.form.value;
        //     const startTimeEntries: string[] = startTime.split(':');
        //     const endTimeEntries: string[] = endTime.split(':');
        //     const startDate: Date = new Date(date);
        //     const endDate: Date = new Date(date);
        //
        //     startDate.setHours(+startTimeEntries[0], +startTimeEntries[1], 0, 0);
        //     endDate.setHours(+endTimeEntries[0], +endTimeEntries[1], 0, 0);
        //
        //     this.ref.close({
        //         name,
        //         startDate,
        //         endDate,
        //         description
        //     });
        // }
    }

    dismiss(): void {
        this.ref.close();
    }
}
