import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { fromEventPattern, Observable, Subscription } from 'rxjs';
import { EventEmitter } from 'events';
import { environment } from '../../../../../environments/environment';

declare const JitsiMeetExternalAPI;

@Component({
    selector: 'app-meet',
    templateUrl: './meet.component.html',
    styleUrls: ['./meet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetComponent implements OnInit, OnDestroy {
    @ViewChild('meet', {static: true}) private meetRef: ElementRef;
    isShowingPostMeetingActions: boolean;

    private jitsiMeetExternalAPI: any;
    private subscription: Subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private changeDetector: ChangeDetectorRef
    ) {
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

            if (!this.isDevEnv) {
                this.startMeet(domain, options);
            } else {
                this.isShowingPostMeetingActions = true;
                this.changeDetector.markForCheck();
            }

            if (this.jitsiMeetExternalAPI) {
                this.bindEvents();
            }
        });

    }

    @HostListener('window:beforeunload', ['$event'])
    onBeforeUnload(): void {
        this.disposeConference();
    }

    createAccount(): void {
    }

    startMeet(domain, options): void {
        this.jitsiMeetExternalAPI = new JitsiMeetExternalAPI(domain, options);
    }

    private bindEvents(): void {
        this.subscription.add(this.handleJitsiEvent('readyToClose').subscribe(
            () => {
                this.disposeConference();
                this.isShowingPostMeetingActions = true;
                this.changeDetector.markForCheck();
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

    private isDevEnv(): boolean {
        return !environment.production;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.jitsiMeetExternalAPI.dispose();
    }

}
