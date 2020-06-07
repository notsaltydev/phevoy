import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { addDays, addHours, endOfMonth, startOfDay, subDays } from 'date-fns';
import { ConferenceDto } from '../../../../schedule/src/models';
import { ScheduleService } from '../../../../schedule/src/services/schedule';
import { NbDialogService, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { ScheduleDialogComponent } from '../schedule-dialog/schedule-dialog.component';
import { ScheduleDialogMode, ScheduleDialogView } from '../../models';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

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

export interface CalendarMetaData extends ConferenceDto {
    metaTitle?: string;
}

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
    events: CalendarEvent<CalendarMetaData>[];
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
    activeDayIsOpen: boolean = false;
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
    private mockEvents: CalendarEvent[] = [
        {
            start: subDays(startOfDay(new Date()), 1),
            end: addDays(new Date(), 1),
            title: 'A 3 day event',
            color: colors.red,
            actions: this.actions,
            allDay: true,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
        },
        {
            start: startOfDay(new Date()),
            title: 'An event with no end date',
            color: colors.yellow,
            actions: this.actions,
        },
        {
            start: subDays(endOfMonth(new Date()), 3),
            end: addDays(endOfMonth(new Date()), 3),
            title: 'A long event that spans 2 months',
            color: colors.blue,
            allDay: true,
        },
        {
            start: addHours(startOfDay(new Date()), 2),
            end: addHours(new Date(), 2),
            title: 'A draggable and resizable event',
            color: colors.yellow,
            actions: this.actions,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
        },
    ];
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private breakpointService: NbMediaBreakpointsService,
        private changeDetector: ChangeDetectorRef,
        private dialogService: NbDialogService,
        private router: Router,
        private scheduleService: ScheduleService,
        private themeService: NbThemeService
    ) {
    }

    ngOnInit(): void {
        const {md} = this.breakpointService.getBreakpointsMap();

        this.scheduleService.getConferences()
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

    openDialog(date: Date, events: CalendarEvent<CalendarMetaData>[], view: ScheduleDialogView, mode: ScheduleDialogMode): void {
        this.dialogService.open(ScheduleDialogComponent, {
            context: {
                title: 'ScheduleDialogComponent',
                date,
                events,
                view,
                mode
            }
        }).onClose
            .pipe(
                filter((data: any | null) => data)
            )
            .subscribe((dialogPayload: any) => {
                if (dialogPayload.action === 'Join') {
                    this.router.navigate(['meet', dialogPayload.payload.id]);
                }
            });
    }

    dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
        this.openDialog(date, events, ScheduleDialogView.LIST, ScheduleDialogMode.UPDATE);
    }

    eventTimesChanged({
                          event, newStart, newEnd
                      }: CalendarEventTimesChangedEvent): void {

        this.events = this.events.map((iEvent) => {
            if (iEvent === event) {
                return {
                    ...event,
                    start: newStart,
                    end: newEnd,
                };
            }
            return iEvent;
        });

        this.handleEvent('Dropped or resized', event);
    }

    handleEvent(action: string, event: CalendarEvent): void {
        if (action === 'Clicked') {
            this.openDialog(event.start, [event], ScheduleDialogView.FORM, ScheduleDialogMode.UPDATE);
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
}
