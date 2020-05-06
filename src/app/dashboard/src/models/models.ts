export enum ScheduleDialogView {
    FORM = 'form',
    LIST = 'list',
}

export enum ScheduleDialogMode {
    UPDATE = 'update',
    CREATE = 'create',
}

export interface Conference {
    startDate: Date;
    endDate: Date;
    name: string;
    description: string;
}
