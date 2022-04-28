export class LeaveRegulationBalance {
    id?: number;
    leaveRegulationId?: number;

    maxNumberOfDaysPerYear?: number;
    hasNumberOfTimesPerYear?: boolean;
    timesPerYear?: number;
    isBalanceFixed?: boolean;
    isFinanciallyRelated?: boolean;
    continousNumberOfDays?: number;
    hasNumberOfTimesPerService?: boolean;
    numberOfTimesPerService?: number;
    isRemainingDaysTransfared?: boolean;
    numberOfRemainingDaysTransfared?: number;
    balancePerYear?: number;
    balanceType?:number;

    leaveRegulationBalanceJobDegrees?: LeaveRegulationBalanceJobDegree[];
    leaveRegulationBalancePeriods?: LeaveRegulationBalancePeriod[];
}

export class LeaveRegulationBalanceJobDegree {
    id?: number;
    leaveRegulationBalanceId?: number;
    jobDegreeId?: number;
    numberOfDays?: number;
}

export class LeaveRegulationBalancePeriod {
    id?: number;
    balancePeriodId?: number;
    from?: number;
    to?: number;
}
