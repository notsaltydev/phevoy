export enum ScheduleDialogView {
    FORM = 'form',
    LIST = 'list',
}

export enum ScheduleDialogMode {
    UPDATE = 'update',
    CREATE = 'create',
}

export interface ConferenceFormValue {
    id?: string; // TODO to remove.
    startDate: Date;
    endDate: Date;
    name: string;
    description: string;
}
