export interface ScheduleDto {
    id: string;
    date: Date;
    createdOn: Date;
    updatedOn: Date;
    owner: any;
    conferences?: any[];
}
