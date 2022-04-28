import { AllowanceSettingReplacement } from './AllowanceSettingReplacement';

export class AllowanceSetting {
    id?: number;
    allowanceId?: number;
    startDate?: Date;
    endDate?: Date;
    replaceDutyAllowanceIn?: boolean ;
    replaceDutyAllowanceOut?: boolean ;
    allowReplacement?: boolean ;
    cancelInRamadan?: boolean ;
    notes?: string;
    isDefault?: boolean;
    allowanceSettingReplacements?: AllowanceSettingReplacement[];
}
