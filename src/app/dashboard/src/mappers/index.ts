import { ConferenceDto } from '../../../schedule/src/models';

export function conferenceDtoToConferenceList(conferences: ConferenceDto[]): { [id: string]: ConferenceDto[] } {
    return conferences.reduce((list, conference: ConferenceDto) => {
        const date: string = new Date(conference.startDate).toISOString().split('T')[0];

        if (!list[date]) {
            list[date] = [];
        }

        list[date].push(conference);

        return list;
    }, {});
}
