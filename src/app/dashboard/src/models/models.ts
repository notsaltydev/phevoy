import { ConferenceDto } from './conference.dto';

export enum ScheduleDialogView {
    FORM = 'form',
    LIST = 'list',
}

export enum ScheduleDialogMode {
    UPDATE = 'update',
    CREATE = 'create',
}

export interface ScheduleDialogClosePayload {
    action: string;
    payload: ConferenceDto;
}

export interface ConferenceFormValue {
    startDate: Date;
    endDate: Date;
    name: string;
    description: string;
}
