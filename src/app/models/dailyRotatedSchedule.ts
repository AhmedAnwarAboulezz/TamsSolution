export class DailyRotatedSchedule {
    id?: number;
    code?: string;
    groupDescriptionFl?: string;
    groupDescriptionSl?: string;
    note?: string;
    startDate?: Date;
    endDate?: Date;
    tempelateDay?: number;
    dailyRotatedScheduleDetail?: DailyRotatedScheduleDetail[];
}

export class DailyRotatedScheduleDetail {
    id?: number;
    dayDate?: Date;
    dayTypeId?: number;
    dayTypeFl?: string;
    dayTypeSl?: string;
    dailyRotatedScheduleId?: number;
    rotatedDutyId?: number;
    code?: string;
    rotatedDescriptionFl?: string;
    rotatedDescriptionSl?: string;
}
