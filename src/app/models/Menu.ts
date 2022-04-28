import { Permissions } from './Permissions';

export class Menu {
    id?: string;
    componentName?: string;
    orderNumber?: number;
    isReport?: boolean;
    urlPath?: string;
    iconName?: string;
    canShow?: boolean;
    parentId?: string;
    childerns?: Menu[];
    permissions: Permissions;
}
