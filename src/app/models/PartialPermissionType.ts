export class PartialPermissionType{
    id?: number;
    code?: string;
    partialPermissionFL?: string;
    partialPermissionSL?: string;
    countryId?: number;
    countryNameFl?:string;
    countryNameSl?:string;
    balance?: number;
    numberPerMonth?: number;
    period?: number;
    calculatePermissionDutyAllowance?: Boolean;
    calculatePermissionDutyAllowanceCancelInRamadan?: Boolean;
    calculatePermissionEmployeeAllowances?: Boolean;
    calculatePermissionEmployeeAllowancesCancelInRamadan?: Boolean;
    active?: Boolean;
    isOfferedBefore? : boolean;
    numberOfferedBefore?: number;
}