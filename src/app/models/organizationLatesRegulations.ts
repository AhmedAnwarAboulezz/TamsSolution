export class OrganizationLatesRegulations{

    startDate?: Date;
    endDate?: Date;
    id?: number;
    note?: string;
    calcLateGoingOutDuty? :boolean;
    calcTotalLates_LateIn? :boolean;
    calcTotalLates_EarlyOut?:boolean;
    calcTotalLates_LateGoingOutDuty?:boolean;
    goingOutAllowance? : number ; 
    calclateAfterDutyAllowanceIn ?:boolean;
    calcEarlyOutBeforeAllowanceOut ?:boolean;
    isDefault?:boolean;

}