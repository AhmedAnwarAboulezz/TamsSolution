import { LeaveRegulationBalance } from './LeaveRegulationBalance';
import { LeaveRegulationCalculation } from './LeaveRegulationCalculation';

export class LeaveRegulation {
    id?: number;
    leaveTypeId?: number;
    leaveTypeName?: string;
    leaveTypeNameFl?:String;
    leaveTypeNameSl?:string

    countryId?: number;
    countryName?: string;
    countryNameFl?:string;
    countryNameSl?:string;

    leaveNameFl?: string;
    leaveNameSl?: string;

    genderId?: any;

    leaveRegulationReligions?: LeaveRegulationReligion[];

    isSpecialToGeneralManager?: boolean;
    isNeedApproval?: boolean;
    isRelatedToSalary?: boolean;
    isAllowedUnPaid? : boolean;
    active? : boolean;
    calculateAfterDays?: number;

    isOfferedBefore? : boolean;
    numberOfferedBefore?: number;
  
    attachmentsTypeId?: number;

    balancePerYear?: number;

    leaveRegulationBalance?: LeaveRegulationBalance;
    leaveRegulationCalculation?: LeaveRegulationCalculation;

}

export class LeaveRegulationReligion {
    leaveRegulationId?: number;
    religionId?: number;
}


