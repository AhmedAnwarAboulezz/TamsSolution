export class organizationSetting {
    id? : number ;
    organizationId? : number;
    nationalityId? :number;
    isActiveDirectory? :boolean;
    adDomainName? : string;
    primaryKeyId? : number;
    adKeyId? :number;
    restDayId? : number;
    weekendDayId? : number;
    isReviewLogs? :boolean;
}

export class settingActualWorking {
    id? : string;
    transactionId? : string;
    typeId? :string;
    organizationId? : string;

}

// export class settingActualWorkingTest {
//     transactionIds? : number[];
//     typeId? :number[];
//     organizationId? : number;

// }