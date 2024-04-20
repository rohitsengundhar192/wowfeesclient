import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  MatDatepicker,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { DateTime } from 'luxon';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { JwtauthService } from 'src/app/shared/services/api/jwtauth.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';

interface Food {
  value: any;
  viewValue: string;
}

@Component({
  selector: 'app-schedule-new-category',
  templateUrl: './schedule-new-category.component.html',
  styleUrls: ['./schedule-new-category.component.scss'],
})
export class ScheduleNewCategoryComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  firstFormGroup = this._formBuilder.group({
    selAcademicyear: ['', Validators.required],
    selFeecategory: ['', Validators.required],
    feeAmount: ['', Validators.required],
    dueforpayment: ['', Validators.required],
    narration: ['', Validators.required],
  });
  foods: Food[] = [
    { value: 0, viewValue: 'Common Fee, Recurring Fee Payment' },
    { value: 1, viewValue: 'Common Fee, One Time Fee Payment' },
    { value: 2, viewValue: 'Common Fee, Bus Fee Payment' },
    { value: 3, viewValue: 'Custom Fee / Penality Payment' },
  ];
  //* -----------------------  Variable Declaration  -----------------------*//
  groupname: any;
  btndisable: boolean = true;
  country_code: any;
  customer_id: any;
  user_id_login: any;
  customer_sub_domain_name: any;
  customer_logo_data: any;
  user_registration_login_approval_status: any;
  type: any;
  btndisableinput: boolean = true;
  minDate: Date;
  pushUserCategory: any[] = [];
  pushUserCategorySections: any[] = [];
  passDataSelectStudent: any[] = [];
  concatenatedNames: string = '';

  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public loginDialogRef: MatDialogRef<ScheduleNewCategoryComponent>,
    private _formBuilder: FormBuilder,
    private _apiservice: ApiService,
    private authService: JwtauthService,
    private datepipe: DatePipe,
    private _datashare: DataSharingService,
    private _snackbar: SnackBarService
  ) {
    this.minDate = new Date();
    this.today = new Date();
  }
  events: string[] = [];
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    const currentDate = new Date();
    
    const formattedDate = this.datepipe.transform(selectedDate, 'yyyy-MM-dd');
    const formattedTime = this.datepipe.transform(currentDate, 'HH:mm:ss');
    
    const dateTime = `${formattedDate} ${formattedTime}`;
    
    console.log(dateTime);
    this.formattedDatetoPass = dateTime;
    
    this.events.push(`${type}: ${dateTime}`);
  }
  
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login = token.user.user_id;
    this.user_registration_login_approval_status =
      token.user.user_registration_login_approval_status;

    if (this.country_code != undefined) {
      this.getAcademicYear();
      this.getFeeCategory();
    }

    this._datashare.share_category_schedule_new_fee_discount_Data.subscribe(
      (res) => {
        // Clear the array before pushing the new data
        this.pushUserCategory = [];
        this.pushUserCategorySections = [];
        for (let i = 0; i < res.length; i++) {
          const element = res[i].user_category_id;
          const user_category_name = res[i].user_category_name;
          this.pushUserCategory.push(element);
          this.pushUserCategorySections.push(user_category_name);
          this.groupname = this.pushUserCategorySections;
          if (this.pushUserCategory.length > 0) {
            this._apiservice
              .getNameByCategory(
                this.country_code,
                this.customer_id,
                this.pushUserCategory
              )
              .subscribe((res) => {
                this.passDataSelectStudent = res.data[0].details;
                this.updateConcatenatedNames();
              });
          }
        }
      }
    );

    throw new Error('Method not implemented.');
  }
  updateConcatenatedNames() {
    this.concatenatedNames = this.passDataSelectStudent
      .map((item) => item.c_name)
      .join(', ');

    console.log(this.concatenatedNames, 'concatenatedNames');
  }
  //* ----------------------------  APIs Methods  --------------------------*//
  fee_amount_currency_short_form: any = 'INR';

  InsertFeeAssignOthers() {
    let feeAmount: any = this.firstFormGroup.controls['feeAmount'].value;
    let category_name: any =
      this.firstFormGroup.controls['selFeecategory'].value;
    // let selectdate: any = this.firstFormGroup.controls['selectdate'].value;

    let dueforpayment: any =
      this.firstFormGroup.controls['dueforpayment'].value;
    let narration: any = this.firstFormGroup.controls['narration'].value;
    let selAcademicyear: any =
      this.firstFormGroup.controls['selAcademicyear'].value;

    const details: any = {
      user_category_id: this.pushUserCategory,
      scheduled_billing_date: this.pushDateMultiple,
      type: 2,
    };

    this._apiservice
      .insertScheduleNewFeeDiscountCategory(
        this.country_code,
        this.customer_id,
        dueforpayment,
        selAcademicyear.academic_year_start,
        category_name.type,
        feeAmount,
        this.fee_amount_currency_short_form,
        narration,
        details
      )
      .subscribe({
        next: (_res: any) => {
          if (_res.statusCode == 200) {
            this._snackbar.success(_res.message);
            this.onNoClick();
          } else {
            this._snackbar.error(_res.message);
          }
        },
      });
  }
  InsertFeeAssignOne() {
    let feeAmount: any = this.firstFormGroup.controls['feeAmount'].value;
    let category_name: any =
      this.firstFormGroup.controls['selFeecategory'].value;
    // let selectdate: any = this.firstFormGroup.controls['selectdate'].value;

    let dueforpayment: any =
      this.firstFormGroup.controls['dueforpayment'].value;
    let narration: any = this.firstFormGroup.controls['narration'].value;
    let selAcademicyear: any =
      this.firstFormGroup.controls['selAcademicyear'].value;

    const details: any = {
      user_category_id: this.pushUserCategory,
      scheduled_billing_date: this.formattedDatetoPass,
      type: 1,
    };

    this._apiservice
      .insertScheduleNewFeeDiscountCategory(
        this.country_code,
        this.customer_id,
        dueforpayment,
        selAcademicyear.academic_year_start,
        category_name.type,
        feeAmount,
        this.fee_amount_currency_short_form,
        narration,
        details
      )
      .subscribe({
        next: (_res: any) => {
          if (_res.statusCode == 200) {
            this._snackbar.success(_res.message);
            this.onNoClick();
          } else {
            this._snackbar.error(_res.message);
          }
        },
      });
  }

  //Get Academic Year:
  passAcademicYear: any;
  getAcademicYear() {
    this._apiservice
      .getacademicyear(this.country_code, this.customer_id)
      .subscribe((res) => {
        this.passAcademicYear = res.data;
        console.log(this.passAcademicYear, 'passAcademicYear');
      });
  }
  //Get fee category:
  passFeeCategory: any;
  getFeeCategory() {
    this._apiservice
      .getFeeCategoryTable(this.country_code, this.customer_id)
      .subscribe((res) => {
        console.log(res, 'fee category');

        this.passFeeCategory = res.data;
      });
  }
  //* --------------------------  Public methods  --------------------------*//
  calanderTypeMultiorSingleDatetoSelect: any;
  SelectFeeCategory(e: any) {
    console.log(e, 'selected category');
    this.type = e.type;
    console.log(this.type, 'type');

    if (this.type != undefined) {
      this.btndisable = false;
    }
  }

  SelectAcademicYear(e: any) {}
  selected_date: any;
  passMultipleDate: any;
  selectDate(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2);
    const index = this.daysSelected.findIndex((x) => x == date);
    if (index < 0) this.daysSelected.push(date);
    else this.daysSelected.splice(index, 1);
    this.selected_date = this.daysSelected;
    calendar.updateTodaysDate();

    let days: any[] = [];
    let dateFormatpush: any[] = [];
    for (let i = 0; i < this.daysSelected.length; i++) {
      console.log(this.daysSelected[i], 'di');
      days.push(this.datepipe.transform(this.daysSelected[i], 'dd MMM YYYY'));

      dateFormatpush.push(this.daysSelected[i]);

      this.passMultipleDate = dateFormatpush;
      // this.firstFormGroup.controls['selectdate'].patchValue(`${days}`);
    }
  }
  getDataTypedInInput() {
    if (this.groupname !== undefined) {
      const length = this.groupname?.length;

      if (length > 0) {
        this.btndisableinput = false;
      } else {
        this.btndisableinput = true;
      }
    }
  }
  selected_date_Format: any;
  today!: Date;
  start_date: any;
  formattedDatetoPass: any;

  //* ------------------------------ Helper Function -----------------------*//
  event: any;
  daysSelected: any[] = [];
  daySeleted: any;
  isDisabled_save_btn: boolean = true;
  isSelected: any = (event: any) => {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2);
    return this.daysSelected.find((x) => x == date) ? 'selected' : null;
  };

  ngDoCheck(): void {
    this.getDataTypedInInput();
  }
  onNoClick(): void {
    this.loginDialogRef.close();
  }

  public CLOSE_ON_SELECTED = false;
  public init = new Date();
  public resetModel = new Date(0);
  // public model = [];
  public model: any[] = [];
  public pushDateMultiple: any[] = [];
  @ViewChild('picker', { static: true }) _picker!: MatDatepicker<Date>;

  public dateClass = (date: Date) => {
    if (this._findDate(date) !== -1) {
      return ['selected'];
    }
    return [];
  };

  public dateChanged(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const date = event.value;
      const currentTime = new Date();
      const formattedCurrentTime = formatDate(currentTime, 'HH:mm:ss', 'en-US');
      const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');

      const dateTimeString = `${formattedDate} ${formattedCurrentTime}`;

      const index = this._findDate(date);
      if (index === -1) {
        this.model.push(date);
        this.pushDateMultiple.push(dateTimeString);
      } else {
        this.model.splice(index, 1);
        this.pushDateMultiple.splice(index, 1);
      }

      console.log(this.pushDateMultiple, 'model');

      this.resetModel = new Date(0);
      if (!this.CLOSE_ON_SELECTED) {
        const closeFn = this._picker.close;
        this._picker.close = () => {};
        // this._picker['_popupComponentRef'].instance._calendar.monthView._createWeekCells()
        setTimeout(() => {
          this._picker.close = closeFn;
        });
      }
    }
  }

  public remove(date: Date): void {
    const index = this._findDate(date);
    this.model.splice(index, 1);
  }

  private _findDate(date: Date): number {
    return this.model.map((m) => +m).indexOf(+date);
  }
  //! -------------------------------  End  --------------------------------!//
}
