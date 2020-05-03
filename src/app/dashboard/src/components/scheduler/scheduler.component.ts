import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { ConferenceDto } from '../../../../schedule/src/models';
import { ScheduleService } from '../../../../schedule/src/services/schedule';
import { NbDialogService } from '@nebular/theme';
import { ScheduleDialogComponent } from '../schedule-dialog/schedule-dialog.component';

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
export class SchedulerComponent implements OnInit {
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();
    modalData: {
        action: string;
        event: CalendarEvent;
    };
    refresh: Subject<any> = new Subject();
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
    events: CalendarEvent<CalendarMetaData>[];
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
    activeDayIsOpen: boolean = false;

    constructor(
        private scheduleService: ScheduleService,
        private changeDetector: ChangeDetectorRef,
        private dialogService: NbDialogService
    ) {
    }

    ngOnInit(): void {
        this.scheduleService.getConferences()
            .subscribe((conferences: ConferenceDto[]) => {
                this.events = [
                    ...conferences.map((conference: ConferenceDto) => ({
                        start: conference.startDate,
                        end: conference.endDate,
                        title: conference.name,
                        color: colors.purple,
                        actions: this.actions,
                        allDay: true,
                        resizable: {
                            beforeStart: true,
                            afterEnd: true,
                        },
                        draggable: true,
                        meta: conference
                    }))
                ];

                console.log('events', this.events);

                this.changeDetector.markForCheck();
            });
    }

    openDialog({date, events}: { date: Date; events: any }) {
        this.dialogService.open(ScheduleDialogComponent, {
            context: {
                title: 'ScheduleDialogComponent',
                date,
                events
            }
        });
    }

    dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
        console.log('dayClicked', {date, events});

        this.openDialog({date, events});
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                // this.activeDayIsOpen = true;
                this.activeDayIsOpen = false;
            }
            this.viewDate = date;
        }
    }

    eventTimesChanged({
                          event,
                          newStart,
                          newEnd,
                      }: CalendarEventTimesChangedEvent): void {
        console.log('eventTimesChanged', {
            event,
            newStart,
            newEnd,
        });

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
        console.log('handleEvent', {event, action});
        this.modalData = {event, action};
        // this.modal.open(this.modalContent, {size: 'lg'});
    }

    addEvent(): void {
        this.events = [
            ...this.events,
            {
                title: 'New event',
                start: startOfDay(new Date()),
                end: endOfDay(new Date()),
                color: colors.red,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true,
                },
            },
        ];
    }

    deleteEvent(eventToDelete: CalendarEvent) {
        this.events = this.events.filter((event) => event !== eventToDelete);
    }

    setView(view: CalendarView) {
        this.view = view;
    }

    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }

    hourSegmentClicked(date: Date, sourceEvent?: MouseEvent) {
        console.log('hourSegmentClicked', {date, sourceEvent: sourceEvent || null});
    }

    private mapCalendarMetaData(conference: ConferenceDto, conferences: ConferenceDto[]): CalendarMetaData[] {
        return conferences.filter(
            (conf: ConferenceDto) => isSameDay(conf.startDate, conference.startDate)
        );
    }
}
