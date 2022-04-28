import { Validators } from '@angular/forms';

export interface ColumnsInterface {
  field: string;
  header: string;
  placeholder?: string;
  width?: string;
  orderEnabled?: boolean;
  filterMode?: string;
  disable?: boolean;
  selector?: boolean;
  filterDropdown?: {
    nameFl: string;
    nameSl: string,
    id: any;
    cssClasses?: string;
  }[];
  customCell?: string;
  editable?: boolean;
  form?: {
    type: string; // the type of each form controller [select, autocomplete, text, password, date, timer]
    validation?: Validators[];
    placeholder?: string;
    select?: { value: any; name: string }[]; // the array of selection dropdown
    autoComplete?: {
      url: string;
      isMultiple: boolean;
    };
  };
  url?: string;
  print?: boolean;
  sort?: boolean;
  dropdownFilterName?: string;
  sortName?: string;
  serviceName?: string;
  printField?: string;
  translate?: boolean;
  addedText?: any;
  showMore?: boolean;
  isfield?:boolean;



}
