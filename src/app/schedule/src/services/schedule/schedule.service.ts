import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConferenceDto, ScheduleDto, ScheduleListDto } from '../../models';
import { CreateConferenceDto } from '../../models/create-conference.dto';

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

    createSchedule(): Observable<ScheduleDto> {
        return null;
    }

    createConference(scheduleId: string, dto: CreateConferenceDto): Observable<ConferenceDto> {
        return this.httpClient.post<ConferenceDto>(`http://localhost:3000/conference/${scheduleId}`, {
            ...dto
        });
    }

}
