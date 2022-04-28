import { UserLocation } from './UserLocation';
import { UserGroup } from './userGroup';
import { UserAdminstrative } from './userAdminstrative';

export class UserMangment {
        id?: number;
        employeeId?: number;
        employeeNO?: string;
        employeeNameSl?: string;
        employeeNameFl?: string;
        isActive?: boolean;
        isCivilId?: boolean;
        expireDate?: Date; 
        locationId?: number;
        isEndOfContract?: boolean;
        userLocation?: UserLocation[];
        userAdminstrative?: UserAdminstrative[];
        userGroup?: UserGroup[];
        username?: string;
        password?: string;
        civilId?: string;
        userNameTypeId?: number;
        userNameTypeFl?: string;
        userNameTypeSl?: string;
}
