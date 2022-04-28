import { DateFilter } from 'src/app/models/dateFilter';

export class WeekEmployee {
  employeeId?: string;
  employeeName?: string;
  employeeNameAr?: string;
  employeeNumber?:string;
  employeeType?: string;
  sat?: Shift = {};
  sun?: Shift = {};
  mon?: Shift = {};
  tue?: Shift = {};
  wed?: Shift = {};
  thu?: Shift = {};
  fri?: Shift = {};
}

export class Shift {
  id?: number;
  nameFl?: string;
  nameSl?: string;
  dutyId?: string;
  dayOfWeek?: Date;
  isDifferent?: boolean;
  dutyDescriptionSl?: string;
  dutyDescriptionFl?: string;
  isChanged?: boolean;
  isRemoved?: boolean;


}

export class MonthEmployee {
  employeeId?: string;
  employeeName?: string;
  employeeNameAr?: string;
  employeeNumber?:string;
  employeeType?: string;
  day01?: Shift = {};
  day02?: Shift = {};
  day03?: Shift = {};
  day04?: Shift = {};
  day05?: Shift = {};
  day06?: Shift = {};
  day07?: Shift = {};
  day08?: Shift = {};
  day09?: Shift = {};
  day10?: Shift = {};
  day11?: Shift = {};
  day12?: Shift = {};
  day13?: Shift = {};
  day14?: Shift = {};
  day15?: Shift = {};
  day16?: Shift = {};
  day17?: Shift = {};
  day18?: Shift = {};
  day19?: Shift = {};
  day20?: Shift = {};
  day21?: Shift = {};
  day22?: Shift = {};
  day23?: Shift = {};
  day24?: Shift = {};
  day25?: Shift = {};
  day26?: Shift = {};
  day27?: Shift = {};
  day28?: Shift = {};
  day29?: Shift = {};
  day30?: Shift = {};
  day31?: Shift = {};
}

export class Employee {
  employeeId?: string;
  employeeName?: string;
  employeeNameAr?: string;
  shifts?: Shift[];
}

export class ShiftDate {
  stringDates?: string[] = [];
  dates?: any[] = [];
}
export class FixedPeriodDutyCalender {
  monthEmployeeDtos? : Employee[];
  startDate?:Date;
  endDate?:Date;
  //firstSearchType?:string;
}
export class EmployeesDateDayDto{
  employeeIds?: string[]=[];
  dateFilter?: DateFilter;
}

