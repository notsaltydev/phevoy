import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { ConferenceDto } from '../../models/conference.dto';
import { ConferenceListDto } from '../../models/conference-list.dto';
import { CreateConferenceDto } from '../../models/create-conference.dto';

@Injectable()
export class ConferenceService {

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
