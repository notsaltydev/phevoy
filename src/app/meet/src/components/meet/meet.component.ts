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
import { ActivatedRoute, Data, Router } from '@angular/router';
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
    isShowingPostMeetingActions: boolean;
    isLoggedIn: boolean;
    options = {
        roomName: null,
        width: '100%',
        height: '100%',
        parentNode: null
    };
    domain = 'meet.jit.si';
    isLoading: boolean;
    @ViewChild('meet', {static: true}) private meetRef: ElementRef;
    private jitsiMeetExternalAPI: any;
    private subscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private changeDetector: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.isLoggedIn = !!localStorage.getItem('accessToken');
        this.route.data.subscribe((data: Data) => {
            const roomName = `phev-${data.meetId}`;
            const parentNode = this.meetRef.nativeElement;
            this.options = {
                ...this.options,
                roomName,
                parentNode
            };

            this.startMeet(this.domain, this.options);

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
        this.isLoading = true;
        this.isShowingPostMeetingActions = false;
        this.jitsiMeetExternalAPI = new JitsiMeetExternalAPI(domain, options);
        this.bindEvents();
        this.changeDetector.markForCheck();
    }

    backToDashboard(): void {
        this.router.navigate(['/app']);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.disposeConference();
    }

    private bindEvents(): void {
        this.subscription = new Subscription();
        this.subscription.add(this.handleJitsiEvent('readyToClose').subscribe(
            () => {
                this.disposeConference();
                this.isShowingPostMeetingActions = true;
                this.subscription.unsubscribe();
                this.changeDetector.markForCheck();
            }
        ));
        this.subscription.add(this.handleJitsiEvent('videoConferenceJoined').subscribe(
            () => {
                this.isLoading = false;
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

}
