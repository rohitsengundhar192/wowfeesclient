import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StudentCustomFeeComponent } from '../student-custom-fee/student-custom-fee.component';
import { StudentDiscountFeeComponent } from '../student-discount-fee/student-discount-fee.component';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';

@Component({
  selector: 'app-radio-btn',
  templateUrl: './radio-btn.component.html',
  styleUrls: ['./radio-btn.component.scss'],
})
export class RadioBtnComponent implements OnInit {
  constructor(
    public loginDialogRef: MatDialogRef<RadioBtnComponent>,
    private dialog: MatDialog,
    private _datashare: DataSharingService
  ) {}

  ngOnInit(): void {}

  radioOptions!: string;

  onRadioButtonChange(event: any) {
    console.log('event.value=' + event.value);
    if (event.value == 1) {
      const dialogRef = this.dialog.open(StudentCustomFeeComponent, {
        disableClose: true,
        height: '60%',
        width: '600px',
        minWidth: '250px',
        // data: this.radioRowValue,
      });
      dialogRef.afterClosed().subscribe((result) => {
        this._datashare.pass_closeid_dialogue_schedule_new_Data.subscribe(
          (res) => {
            if (res == 1) {
              this.onNoClick();
            } else {
              console.log('not closed');
              this.onNoClick();
            }
          }
        );
      });
    } else {
      const dialogRef = this.dialog.open(StudentDiscountFeeComponent, {
        disableClose: true,
        height: '60%',
        width: '600px',
        minWidth: '250px',
        // data: this.radioRowValue,
      });
      dialogRef.afterClosed().subscribe((result) => {
        this._datashare.pass_closeid_dialogue_schedule_new_Data.subscribe(
          (res) => {
            if (res == 1) {
              this.onNoClick();
            } else {
              console.log('not closed');
              this.onNoClick();
            }
          }
        );
      });
    }
  }

  onNoClick(): void {
    this.loginDialogRef.close();
  }
}
