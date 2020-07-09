export interface ConferenceDto {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;
    createdOn?: Date;
    updatedOn?: Date;
    owner?: any;
}
