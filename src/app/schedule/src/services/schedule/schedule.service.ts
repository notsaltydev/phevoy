import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { ConferenceDto, ScheduleDto, ScheduleListDto } from '../../models';
import { CreateConferenceDto } from '../../models/create-conference.dto';
import { CreateScheduleDto } from '../../models/create-schedule.dto';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {

    constructor(private httpClient: HttpClient) {
    }

    getSchedules(): Observable<ScheduleDto[]> {
        return this.httpClient.get<ScheduleListDto>('http://localhost:3000/schedule').pipe(
            map((scheduleListDto: ScheduleListDto) => scheduleListDto.schedules)
        );
    }

    createSchedule(dto: CreateScheduleDto): Observable<ScheduleDto> {
        console.log('createSchedule', dto.date);
        return this.httpClient.post<ScheduleDto>('http://localhost:3000/schedule', {
            date: dto.date
        }).pipe(
            tap((schedule) => console.log('schedule', schedule))
        );
    }

    createConference(scheduleId: string, dto: CreateConferenceDto): Observable<ConferenceDto> {
        return this.httpClient.post<ConferenceDto>(`http://localhost:3000/conference/${scheduleId}`, {
            ...dto
        });
    }

    updateConference(conferenceId: string, dto: ConferenceDto): Observable<ConferenceDto> {
        return this.httpClient.put<ConferenceDto>(`http://localhost:3000/conference/${conferenceId}`, {
            ...dto
        });
    }

}
