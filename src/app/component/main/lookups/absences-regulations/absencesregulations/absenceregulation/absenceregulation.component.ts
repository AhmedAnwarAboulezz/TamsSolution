import { Component, OnInit, Optional, Inject } from '@angular/core';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { AbsencesregulationsService } from '../../Services/absencesregulations.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AbsenceRegulation } from 'src/app/models/absenceRegulation';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';

@Component({
  selector: 'app-absenceregulation',
  templateUrl: './absenceregulation.component.html',
  styleUrls: ['./absenceregulation.component.scss']
})
export class AbsenceregulationComponent extends BaseEditComponent implements OnInit {
  model: AbsenceRegulation = {};
  id: string;
  url = 'AbsencesRegulations/GetAllPaged';
  isViewDetils;
  isDefault=false;
  header = DatePickerHeader;

  get Service(): AbsencesregulationsService { return Shell.Injector.get(AbsencesregulationsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AbsenceregulationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ){
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
      this.isDefault=this.model.isDefault;

    }else{
      this.model.maxMinutesLate=0;
    }
    this.form = this.resetForm(this.model);
  }
  SaveData(event){
    this.close(event, this.resetForm(new AbsenceRegulation()));
  }
  resetForm(model:AbsenceRegulation):any{
    let resetform = this.fb.group({
      id: [model.id],
      startDate: [model.startDate, Validators.required],
      endDate: [model.endDate, Validators.required],
      note: model.note,
      calcOneSigninDuty:  [model.calcOneSigninDuty != null ? model.calcOneSigninDuty : false],
      calcContAbsWeekEnd: [model.calcContAbsWeekEnd != null ? model.calcContAbsWeekEnd : false],
      calcContAbsRestday: [model.calcContAbsRestday != null ? model.calcContAbsRestday : false],
      calcContAbsHoliday: [model.calcContAbsHoliday != null ? model.calcContAbsHoliday : false] ,
      calcAbsLateinDuty: [model.calcAbsLateinDuty != null ? model.calcAbsLateinDuty : false] ,
      maxMinutesLate: model.maxMinutesLate,
      treeValueMulti: [''],
      treeValueSingle: ['c1390664-f82a-4b73-aaea-08d7a57ac88b'],
      isDefault: [this.isDefault]
     }, { validator: (group) => {
      if (group.controls.calcAbsLateinDuty.value === true) {
        return Validators.required((group.controls.maxMinutesLate));
      }
      return null;
    }
    }   );
    return resetform;
  }
  onCheckChange(event) {
    if (!event.checked) {
      this.form.patchValue({
        maxMinutesLate: 0
      });
    }
  }
  ngOnInit() {
  }

}
