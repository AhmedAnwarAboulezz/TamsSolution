import { Component, OnInit, Input, forwardRef, ViewChild, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';
import { take, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SelectService } from './services/select.service';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { EventEmitter } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {

  /* inputs */
  @Input() url: string;
  @Input() placeholder = 'none';
  @Input() isSearchable = true;
  @Input() isVirtualScroll = true;
  @Input() loading = true;
  @Input() hasTemplate = false;
  @Input() isMultiple = false;
  @Input() id: string;
  @Input() name = 'nameFl';
  @Input() disabledCondition = false;
  @Input() IsNew = false;
  @Input() IncludeIncompleteEmployees = false;
  @Input() InServiceEmployees = true;

  @Output() selectChangeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() getEmployeeData: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(NgSelectComponent, null) ngSelectComponent: NgSelectComponent;
  name1;
  /* private fileds */
  itemsData = [];
  val: any;
  selectedValue: any;
  selectedItems = [];
  scrollSize = 10;
  scrollPageNumber = 1;
  itemsSearchNo = 0;
  getPagenationOptions: any = {
    limit: this.scrollSize,
    offset: this.scrollPageNumber,
    value: '',
    colName: '',
    contain: true,
    isNew: false,
    includeIncompleteEmployees: true,
    inServiceEmployees: true,
    employeeId: null,
    firstCall: false
  };
  InputSearch$ = new Subject<string>();
  onChanged;
  /* elemen refernces */
  @ViewChild('myselect', null) myselect;

  /* events */
  onChange: any = () => { };
  onTouched: any = () => { };
  /* setter anf getter properties */
  get value() {
    return this.val;
  }
  set value(val: any) {
    if (val !== undefined && val !== this.val) {
      this.val = val;
      this.onChange(val);
      this.onTouched(val);
    }
  }
  constructor(public selectService: SelectService, public localize: LocalizationService) {
    this.name1 = this.localize.currentLang == 'Sl' ? 'fullNameSl' : 'fullNameFl';
  }

  writeValue(val: any): void {
    if (val === null || val === undefined) {
      this.getPagenationOptions.employeeId = null;
      this.getPagenationOptions.firstCall = false;
      this.getAllData();
      this.ngSelectComponent.handleClearClick();
      this.value = null;
    } else {
      this.getPagenationOptions.employeeId = val;
      this.getPagenationOptions.firstCall = true;
      this.getAllData();
      this.value = val;
    }

  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  ngOnInit() {

    this.getPagenationOptions.isNew = this.IsNew;
    this.getPagenationOptions.includeIncompleteEmployees = this.IncludeIncompleteEmployees;
    this.getPagenationOptions.inServiceEmployees = this.InServiceEmployees;
    this.searchOnType();

  }
  getAllData() {
    this.selectService.getData(this.url, this.getPagenationOptions)
      .pipe(take(1))
      .subscribe((resp: any) => {
        this.itemsSearchNo = resp.count;
        this.getPagenationOptions.offset++;
        this.loading = false;
        if (
          JSON.stringify(this.itemsData) !== JSON.stringify(resp.list)
        ) {
          this.itemsData = this.itemsData.concat(resp.list);
        }
        if (!this.isMultiple && this.val) {
          this.selectedValue = this.itemsData.find(x => x.id == this.val);
        }
        if (this.isMultiple && this.val) {
          let items: any = [];
          // check here in case the id not found and need to be lazy loaded go and get it and append it to the items
          this.val.forEach(id => {
            let item = this.itemsData.find(x => x.id == id);
            items.push(item);
            this.selectedValue = [...items];
          });
        }
        this.getEmployeeData.emit(this.selectedValue);
      });
  }
  itemSelected(event) {
    if (event) {
      const items: any = [];
      if (this.isMultiple) {
        event.map(e => items.push(e.id));
        this.onChange(items);
      } else {
        this.selectedValue = event;
        this.onChange(event.id);
      }
      this.selectChangeEvent.emit(event);
    } else {
      this.cancelEvent.emit();
    }
  }

  onScrollToEnd() {
    this.getPagenationOptions.firstCall = false;
    if (this.itemsSearchNo === this.itemsData.length) {
      return;
    }
    this.loading = true;
    this.getAllData();
  }

  searchOnType() {
    this.getPagenationOptions.firstCall = false;
    this.InputSearch$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchValue => {
      this.loading = true;
      this.getPagenationOptions.offset = 1;
      if (searchValue) {
        this.getPagenationOptions.value = searchValue;
      } else {
        this.getPagenationOptions.value = '';
      }
      this.itemsData = [];
      this.getAllData();
    });
  }

}
