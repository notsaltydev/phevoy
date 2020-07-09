import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { Observable, Subject } from 'rxjs';
import { ConferenceDto } from '../../models/conference.dto';
import { NbDialogService, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { ScheduleDialogComponent } from '../schedule-dialog/schedule-dialog.component';
import { ScheduleDialogClosePayload, ScheduleDialogMode, ScheduleDialogView } from '../../models';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { getAllConferences } from '../../store/selectors/conference.selector';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducers';
import { conferenceActionTypes } from '../../store/actions/conference.action';
import { Update } from '@ngrx/entity';
import { WindowRef } from '../../../../window/src/services';

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
    },
    purple: {
        primary: '#7d08e3',
        secondary: 'rgba(169,8,227,0.4)',
    },
};

@Component({
    selector: 'app-scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulerComponent implements OnInit, OnDestroy {
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();
    modalData: {
        action: string;
        event: CalendarEvent;
    };
    refresh: Subject<any> = new Subject();
    events: CalendarEvent<ConferenceDto>[];
    actions: CalendarEventAction[] = [
        {
            label: '<i class="fas fa-fw fa-pencil-alt"></i>',
            a11yLabel: 'Edit',
            onClick: ({event}: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            },
        },
        {
            label: '<i class="fas fa-fw fa-trash-alt"></i>',
            a11yLabel: 'Delete',
            onClick: ({event}: { event: CalendarEvent }): void => {
                this.events = this.events.filter((iEvent) => iEvent !== event);
                this.handleEvent('Deleted', event);
            },
        },
    ];
    activeDayIsOpen = false;
    calendarViews: { value: CalendarView, name: string }[] = [
        {
            value: CalendarView.Day,
            name: 'Day',
        },
        {
            value: CalendarView.Week,
            name: 'Week',
        },
        {
            value: CalendarView.Month,
            name: 'Month',
        }
    ];
    currentCalendarView: CalendarView = CalendarView.Month;
    componentSize: 'tiny' | 'small' | 'medium' | 'large' | 'giant' = 'medium';
    isMenuSticky: boolean;
    private destroy$: Subject<void> = new Subject<void>();
    private conferences$: Observable<ConferenceDto[]>;

    constructor(
        private breakpointService: NbMediaBreakpointsService,
        private changeDetector: ChangeDetectorRef,
        private dialogService: NbDialogService,
        private router: Router,
        private themeService: NbThemeService,
        private store: Store<AppState>,
        private windowRef: WindowRef
    ) {
    }

    ngOnInit(): void {
        const {md} = this.breakpointService.getBreakpointsMap();
        this.conferences$ = this.store.select(getAllConferences);
        this.conferences$
            .subscribe((conferences: ConferenceDto[]) => {
                this.events = [
                    ...conferences.map((conference: ConferenceDto) => ({
                        start: conference.startDate,
                        end: conference.endDate,
                        title: conference.name,
                        color: colors.purple,
                        actions: this.actions,
                        // allDay: true,
                        resizable: {
                            beforeStart: true,
                            afterEnd: true,
                        },
                        draggable: true,
                        meta: conference
                    }))
                ];

                this.changeDetector.markForCheck();
            });

        this.themeService.onMediaQueryChange()
            .pipe(
                takeUntil(this.destroy$),
                map(([, currentBreakpoint]) => currentBreakpoint.width)
            )
            .subscribe((currentBreakpointWidth: number) => {
                this.componentSize = currentBreakpointWidth < md ? 'small' : 'medium';
                this.changeDetector.markForCheck();
            });
    }

    openDialog(date: Date, events: CalendarEvent<ConferenceDto>[], view: ScheduleDialogView, mode: ScheduleDialogMode): void {
        this.dialogService.open(ScheduleDialogComponent, {context: {date, events, view, mode}})
            .onClose.pipe(
            takeUntil(this.destroy$),
            filter(data => data)
        ).subscribe((metadata: ScheduleDialogClosePayload) => {
            const action = metadata.action;
            const conference: ConferenceDto = metadata.payload;

            if (action === 'Join') {
                this.router.navigate(['meet', conference.id]);
            }

            if (action === 'Create') {
                this.store.dispatch(conferenceActionTypes.createConference({conference}));
            }

            if (action === 'Update') {
                const update: Update<ConferenceDto> = {
                    id: conference.id,
                    changes: {
                        ...conference
                    }
                };

                this.store.dispatch(conferenceActionTypes.updateConference({update}));
            }
            if (metadata.action === 'Delete') {
                this.store.dispatch(conferenceActionTypes.deleteConference({conferenceId: conference.id}));
            }
        });
    }

    dayClicked({date, events}: { date: Date; events: CalendarEvent<ConferenceDto>[] }): void {
        this.openDialog(date, events, ScheduleDialogView.LIST, ScheduleDialogMode.UPDATE);
    }

    eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
        const updatedCalendarEvent: CalendarEvent<ConferenceDto> = {
            ...event,
            start: newStart,
            end: newEnd
        };

        this.handleEvent('Dropped or resized', updatedCalendarEvent);
    }

    handleEvent(action: string, event: CalendarEvent<ConferenceDto>): void {
        if (action === 'Clicked') {
            this.openDialog(event.start, [event], ScheduleDialogView.FORM, ScheduleDialogMode.UPDATE);
        }

        if (action === 'Dropped or resized') {
            const update: Update<ConferenceDto> = {
                id: event.meta.id,
                changes: {
                    ...event.meta,
                    startDate: event.start,
                    endDate: event.end
                }
            };

            this.store.dispatch(conferenceActionTypes.updateConference({update}));
        }
    }

    setView(view: CalendarView): void {
        this.view = view;
        this.changeDetector.markForCheck();
    }

    closeOpenMonthViewDay(): void {
        this.activeDayIsOpen = false;
    }

    hourSegmentClicked(date: Date, sourceEvent?: MouseEvent): void {
        this.openDialog(date, [], ScheduleDialogView.FORM, ScheduleDialogMode.CREATE);
    }

    changeCalendarView(view: CalendarView): void {
        this.setView(view);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    @HostListener('window:scroll', ['$event']) onWindowScroll(): void {
        this.setMenuFixed();
    }

    private setMenuFixed(): void {
        const height: number = this.windowRef.nativeWindow.pageYOffset;

        this.isMenuSticky = height > 0;
    }
}
