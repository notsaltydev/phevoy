import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ScheduleListDto } from "../models/schedule-list.dto";
import { ScheduleDto } from "../models/schedule.dto";
import { map } from "rxjs/operators";

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
}
