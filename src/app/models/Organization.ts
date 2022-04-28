export class Organization {
    id: number ;
    organizationNameSl: string;
    organizationNameFl:string;
    nickName: string;
    code: string;
    registrationEmail:string;
    alternativeEmail:string;
    primaryLanguage: string;
    secondaryLanguage: string;
    logoURLFl: string;
    logoURLSl: string;
    isPromise?:boolean;
    timeZoneId:number;
}