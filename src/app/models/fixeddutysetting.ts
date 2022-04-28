export class FixedDutySetting {
    hasHoliday:  boolean;
    includeOverTime:  boolean;

    id: number;
    fixedDutyId: number;
    dutyDescriptionFl:string;
    dutyDescriptionSl:string;
   

    dutyTypeId:number;
    dutyTypeFl:string;
    dutyTypeSl :string;

    dutyStatusId: number;
    dutyStatusNameFl:string;
    dutyStatusNameSl:string;

    weekEndId: number;
    weekEndNameFl:string;
    weekEndNameSl:string;

    restDayId: number;
    restDayNameFl:string;
    restDayNameSl:string;

    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    allowLaunch:  boolean;
    from:string;
    to:string;
    mustSign:  boolean;
    notes:string;
    allowHalfDay:  boolean| null;

    halfDayId: number;
    halfDayNameFl:string;
    halfDayNameSl:string;

    halfDayEndTime:string;
    halfDayStartTime:string;
    workingHour: string;
    allowanceIn: number;
    allowanceOut: number;
    signAfter: number;
    signBefor:number;

    halfDayAllowanceIn: number;
    halfDayAllowanceOut: number;

    //workingHours:string;
}