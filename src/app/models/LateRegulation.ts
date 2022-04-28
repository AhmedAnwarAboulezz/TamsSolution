import { lateRegulationContractType } from './lateRegulationContractType';
import { lateRegulationDeduction } from './lateRegulationDeduction';

export class LateRegulation {
    id?: number;
    lateRegulationNameFL?: string;
    lateRegulationNameSL?: string;
    startDate?: Date;
    endDate?: Date;
    allowance?: number;
    note?: string;

    deductionGroupTypeId?: number;
    deductionGroupTypeNameSl?: string;
    deductionGroupTypeNameFl?: string;

    lengthOfServiceFrom?: number|null;
    lengthOfServiceTo?: number|null;

    deductionCategoreID?: number;

    lateRegulationContractTypes?: lateRegulationContractType [];
    lateRegulationDeductions?: lateRegulationDeduction [];

}
