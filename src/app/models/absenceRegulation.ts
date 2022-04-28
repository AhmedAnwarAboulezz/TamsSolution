export class AbsenceRegulation{

    startDate?: Date;
    endDate?: Date;
    id?: number;
    note?: string;
    calcOneSigninDuty? :boolean;
    calcContAbsWeekEnd? :boolean;
    calcContAbsRestday?:boolean;
    calcContAbsHoliday?:boolean;
    calcAbsLateinDuty? :boolean;
    maxMinutesLate? : number ; 
    isDefault?:boolean;

}