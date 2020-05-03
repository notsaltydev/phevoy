import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConferenceDto, ConferenceListDto } from '../../models';
import { CreateConferenceDto } from '../../models/create-conference.dto';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {

    constructor(private httpClient: HttpClient) {
    }

    getConferences(): Observable<ConferenceDto[]> {
        return this.httpClient.get<ConferenceListDto>('http://localhost:3000/conference').pipe(
            map((conferenceListDto: ConferenceListDto) =>
                conferenceListDto.conferences.map((conference: ConferenceDto) => this.conferenceDtoToConference(conference)))
        );
    }

    createConference(dto: CreateConferenceDto): Observable<ConferenceDto> {
        return this.httpClient.post<ConferenceDto>(`http://localhost:3000/conference`, {
            ...dto
        }).pipe(map((conference: ConferenceDto) => this.conferenceDtoToConference(conference)));
    }

    updateConference(conferenceId: string, dto: ConferenceDto): Observable<ConferenceDto> {
        return this.httpClient.put<ConferenceDto>(`http://localhost:3000/conference/${conferenceId}`, {
            ...dto
        }).pipe(map((conference: ConferenceDto) => this.conferenceDtoToConference(conference)));
    }

    deleteConference(conferenceId: string): Observable<ConferenceDto> {
        return this.httpClient.delete<ConferenceDto>(`http://localhost:3000/conference/${conferenceId}`);
    }

    private conferenceDtoToConference(conference: ConferenceDto): ConferenceDto {
        return ({
            ...conference,
            startDate: new Date(conference.startDate),
            endDate: new Date(conference.endDate)
        });
    }
}
