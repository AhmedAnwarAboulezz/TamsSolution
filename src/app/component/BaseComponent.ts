import { Shell } from './shell';
import { AlertService } from '../services/AlertService';
import { DataService, APIs } from '../services/shared';
import { LocalizationService } from '../services/localization/localization.service';
export abstract class BaseComponent {

    get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
    get alertService(): AlertService { return Shell.Injector.get(AlertService); }
    get service(): DataService { return Shell.Injector.get(DataService); }
    get APIs(): APIs { return Shell.Injector.get(APIs); }
    dir = 'dir';
    constructor() {

    }
}
