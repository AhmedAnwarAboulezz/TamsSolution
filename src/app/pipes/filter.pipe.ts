import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { LocalizationService } from '../services/localization/localization.service';


@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(value, term) {

    if (!term) return value;
    return value.filter(item =>
      (item != null && item.nameFl != null) ? item.nameFl.toLowerCase().indexOf(term.toLowerCase()) !== -1: '');
  }
}
@Pipe({ name: 'showTimeSpan' })
export class ShowTimeSpanPipe implements PipeTransform {
  transform(timeObj, format, type) {
    if(type == "fromDate")
    {
      return moment(timeObj).format(format);
    }
    return moment(timeObj,"HH:mm").format(format);
  
 }
}

@Pipe({ name: 'auditField' })
export class AuditField implements PipeTransform {
  transform(propName, screenName) {
    screenName = screenName.endsWith("y")? screenName.replace(/.$/, "ies.") : screenName + "s.";
    screenName = screenName[0].toLowerCase()+ screenName.substr(1);
    propName = propName.replace("*", "");
    propName = propName.replace("+", "");
    propName = propName.replace("-", "");  
    propName = propName[0].toLowerCase()+ propName.substr(1);
    propName = propName.endsWith("Id")? propName.replace("Id", "Name") : propName;
    let result = screenName + propName;
     return result;
  }  
 }


@Pipe({ name: 'excludeItem' })
export class ExcludeItemPipe implements PipeTransform {
    transform(listData: any[], filterId): any {
        if (!listData || !filterId || listData.length == 0) {
            return listData;
        }
        listData = listData.filter(a=>a.id !== filterId);
        return listData;
    }
  }

@Pipe({ name: 'neglectSort' })
export class NeglectSortPipe implements PipeTransform {
    transform(listData: any[]): any {
        if (!listData || listData.length == 0) {
            return listData;
        }
        listData = listData.filter(a=>a.sort == true);
        return listData;
    }
  }

  
@Pipe({ name: 'getNameFromList' })
export class GetItemNameFromListPipe implements PipeTransform {
  constructor(private localize: LocalizationService) {
  }
    transform(itemId:any,listData: any[]): any {

        if (!listData || listData.length == 0) {
            return itemId;
        }
        let itemObject=  listData.find(a=>a.id == itemId);
        if (itemObject == null || itemObject == undefined) {
            return itemId;
        }
        return this.localize.currentLang == 'Fl' ? itemObject.nameFl : itemObject.nameSl;

    }
  }

  



  @Pipe({
    name: 'localizedDate'
  })
  export class LocalizedDatePipe implements PipeTransform {
  
    constructor(private localize: LocalizationService) {
    }
    transform(value: any, withTime: boolean = false): any {
      if(value !== '' && value !== null && value != undefined)
      {
        let dateObj = new Date(value);
        let currentCulture = this.localize.lang == 'ar' ? 'ar-EG' : 'en-US';
        if(withTime)
        {
          return  moment.parseZone(dateObj,'dd MMM yyyy', currentCulture).format('DD MMM YYYY (hh:mm a)');
        }
        else{
          return moment.parseZone(dateObj,'dd MMM yyyy', currentCulture).format('DD MMM YYYY');
        }
      }
      return "";
    }
  
  }
  
  
  @Pipe({
    name: 'localizedMonthYear'
  })
  export class LocalizedMonthYearPipe implements PipeTransform {
    constructor(private localize: LocalizationService) {
    }
    transform(value: any): any {
      if(value !== '' && value !== null && value != undefined)
      {
        let dateObj = new Date(value);
        let currentCulture = this.localize.lang == 'ar' ? 'ar-EG' : 'en-US';
          return moment.parseZone(dateObj,'dd MMM yyyy', currentCulture).format('MMM yyyy');      
      }
      return "";
    }
  }
  
  
  @Pipe({
    name: 'monthName'
  })
  export class MonthNamePipe implements PipeTransform {
    constructor(private localize: LocalizationService) {
    }
    monthsListAr = ['يناير' , 'فبراير' , 'مارس' , 'أبريل', 'مايو' , 'يونيو', 'يوليو' , 'أغسطس', 'سبتمبر' , 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    monthsListEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    transform(monthNumber: number): any {    
        if (!monthNumber || monthNumber > 12 || monthNumber < 1) {
            return monthNumber;
        }     
        return this.localize.lang == 'ar' ? this.monthsListAr[monthNumber - 1] : this.monthsListEn[monthNumber - 1];
    }
  }

  // @Pipe({
  //   name: 'roundFloat'
  // })
  // export class RoundFloatPipe implements PipeTransform {
  //   transform(floatValue: number): any {    
  //       let test =   
  //       return this.localize.lang == 'ar' ? this.monthsListAr[monthNumber - 1] : this.monthsListEn[monthNumber - 1];
  //   }
  // }


  @Pipe({
    name: 'minutesToHours'
  })
  export class MinutesToHoursPipe implements PipeTransform {
    constructor(private localize: LocalizationService) {
    }
    transform(minutes: number): any {    
        if (!minutes) {
            return minutes;
        }     
        let hours = Math.floor(minutes / 60);
        let extraMin = minutes % 60;
        let rr = this.localize.translate.instant('Message.UpdateSuccess');
        let result = `${hours} ${this.localize.translate.instant('Hours')} ${extraMin} ${this.localize.translate.instant('Minutes')}`
        return result;
    }
  }
  