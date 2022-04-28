import { Component, ViewChild, OnInit } from '@angular/core';

interface Bank {
  id: string;
  name: string;
}
@Component({
  selector: 'app-dropdown-table',
  templateUrl: './dropdown-table.component.html',
  styleUrls: ['./dropdown-table.component.scss']
})
export class DropdownTableComponent implements OnInit {

  @ViewChild('mySelect', { static: false }) mySelect;
  employees: any[] = [
    { employeeName: 'Ahmed', employeeNumber: '111', civilId: '123456789' },
    { employeeName: 'Mohamed', employeeNumber: '222', civilId: '123741235' },
    { employeeName: 'Abdallah', employeeNumber: '333', civilId: '241745444' },
    { employeeName: 'Marae', employeeNumber: '444', civilId: '222455541' },
    { employeeName: 'Fouad', employeeNumber: '555', civilId: '753951258' },
    { employeeName: 'Kamal', employeeNumber: '666', civilId: '741258963' },
    { employeeName: 'Saher', employeeNumber: '777', civilId: '842354123' },
    { employeeName: 'Abdelgalel', employeeNumber: '888', civilId: '741258963' },
    { employeeName: 'Abdelkarim', employeeNumber: '999', civilId: '775544112' },
    { employeeName: 'Morsy', employeeNumber: '123', civilId: '1447585555' }
  ];
  _employees = [...this.employees];
  selectData: any;

  ngOnInit() {

  }

  click(dd) {
    if (dd == '') {
      return this._employees = this._employees;
    }
    this._employees = this._employees.filter(val => val.value.toLowerCase().includes(dd) || val.viewValue.toLowerCase().includes(dd));
  }

  select(data) {
    this.selectData = data;
  }
}
