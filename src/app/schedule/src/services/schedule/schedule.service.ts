import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ScheduleDto, ScheduleListDto } from "../../models";

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
