import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { fromEventPattern, Observable, Subscription } from 'rxjs';
import { EventEmitter } from 'events';

declare const JitsiMeetExternalAPI;

@Component({
    selector: 'app-meet',
    templateUrl: './meet.component.html',
    styleUrls: ['./meet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetComponent implements OnInit, OnDestroy {
    @ViewChild('meet', {static: true}) private meetRef: ElementRef;
    private jitsiMeetExternalAPI: any;
    private subscription: Subscription = new Subscription();

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

            this.jitsiMeetExternalAPI = new JitsiMeetExternalAPI(domain, options);

            if (this.jitsiMeetExternalAPI) {
                this.bindEvents();
            }
        });

    }

    @HostListener('window:beforeunload', ['$event'])
    onBeforeUnload() {
        this.disposeConference();
    }

    private bindEvents() {
        this.subscription.add(this.handleJitsiEvent('readyToClose').subscribe(
            () => {
                this.jitsiMeetExternalAPI.dispose();
            }
        ));
    }

    private handleJitsiEvent<T>(eventName: string): Observable<any> {
        return fromEventPattern<T>((handler) => this.jitsiEventHandler(eventName, handler));
    }

    private jitsiEventHandler(eventName, handler): EventEmitter {
        return this.jitsiMeetExternalAPI.on(eventName, handler);
    }

    private disposeConference(): void {
        if (!!this.jitsiMeetExternalAPI) {
            this.jitsiMeetExternalAPI.dispose();
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.jitsiMeetExternalAPI.dispose();
    }

}
