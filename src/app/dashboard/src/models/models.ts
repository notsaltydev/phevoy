export enum ScheduleDialogView {
    FORM = 'form',
    LIST = 'list',
}

export interface Conference {
    startDate: Date;
    endDate: Date;
    name: string;
    description: string;
}
