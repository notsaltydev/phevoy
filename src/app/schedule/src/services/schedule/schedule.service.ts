import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConferenceDto, ConferenceListDto } from '../../models';
import { CreateConferenceDto } from '../../models/create-conference.dto';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {

    constructor(private httpClient: HttpClient) {
    }

    getConferences(): Observable<ConferenceDto[]> {
        return this.httpClient.get<ConferenceListDto>(`${environment.BASE_URL}/conference`).pipe(
            map((conferenceListDto: ConferenceListDto) =>
                conferenceListDto.conferences.map((conference: ConferenceDto) => this.conferenceDtoToConference(conference)))
        );
    }

    createConference(dto: CreateConferenceDto): Observable<ConferenceDto> {
        return this.httpClient.post<ConferenceDto>(`${environment.BASE_URL}/conference`, {
            ...dto
        }).pipe(map((conference: ConferenceDto) => this.conferenceDtoToConference(conference)));
    }

    updateConference(conferenceId: string, dto: ConferenceDto): Observable<ConferenceDto> {
        return this.httpClient.put<ConferenceDto>(`${environment.BASE_URL}/conference/${conferenceId}`, {
            ...dto
        }).pipe(map((conference: ConferenceDto) => this.conferenceDtoToConference(conference)));
    }

    deleteConference(conferenceId: string): Observable<ConferenceDto> {
        return this.httpClient.delete<ConferenceDto>(`${environment.BASE_URL}/conference/${conferenceId}`);
    }

    private conferenceDtoToConference(conference: ConferenceDto): ConferenceDto {
        return ({
            ...conference,
            startDate: new Date(conference.startDate),
            endDate: new Date(conference.endDate)
        });
    }
}
