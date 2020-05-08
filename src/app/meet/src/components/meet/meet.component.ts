import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

declare const JitsiMeetExternalAPI;

@Component({
    selector: 'app-meet',
    templateUrl: './meet.component.html',
    styleUrls: ['./meet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetComponent implements OnInit {
    @ViewChild('meet', {static: true}) private meetRef: ElementRef;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.data.subscribe((data: Data) => {
            const roomName = `phev-${data.meetId}`;
            const domain = 'meet.jit.si';
            const options = {
                roomName,
                width: '100%',
                height: '100%',
                parentNode: this.meetRef.nativeElement
            };

            const api = new JitsiMeetExternalAPI(domain, options);
        });
    }

}
