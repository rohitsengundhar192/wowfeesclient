import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
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
  selector: 'app-schedule-edit-category',
  templateUrl: './schedule-edit-category.component.html',
  styleUrls: ['./schedule-edit-category.component.scss'],
})
export class ScheduleEditCategoryComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    selectdate: new FormControl('', Validators.required),
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
  category_wise_schedule_id: any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public loginDialogRef: MatDialogRef<ScheduleEditCategoryComponent>,
    private _formBuilder: FormBuilder,
    private _apiservice: ApiService,
    private authService: JwtauthService,
    private datepipe: DatePipe,
    private _datashare: DataSharingService,
    private _snackbar: SnackBarService,

    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public EditedData: any
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

    console.log(this.EditedData, 'edit');
    this.type = this.EditedData.fee_category_id;
    this.category_wise_schedule_id = this.EditedData.category_wise_schedule_id;

    let FormatDated = formatDate(
      this.EditedData.scheduled_billing_date,
      'yyyy-MM-dd',
      'en-US'
    );
    console.log(FormatDated, 'formattedDate');

    if (this.EditedData != undefined) {
      this.firstFormGroup.controls['selAcademicyear'].patchValue(
        this.EditedData.academic_year
      );
      this.firstFormGroup.controls['selFeecategory'].patchValue(
        this.EditedData.fee_category_id
      );
      this.firstFormGroup.controls['feeAmount'].patchValue(
        this.EditedData.fee_amount
      );
      this.firstFormGroup.controls['dueforpayment'].patchValue(
        this.EditedData.due_for_payment_days
      );
      this.firstFormGroup.controls['narration'].patchValue(
        this.EditedData.narration
      );
      this.firstFormGroup.controls['selectdate'].patchValue(FormatDated);
      this.groupname = this.EditedData.c_name;
    }

    this._datashare.share_category_schedule_new_fee_discount_Data.subscribe(
      (res) => {
        console.log(res, 'res');

        // Clear the array before pushing the new data
        this.pushUserCategory = [];
        this.pushUserCategorySections = [];
        // for (let i = 0; i < res.length; i++) {
        //   const element = res[i].user_category_id;
        //   const user_category_name = res[i].user_category_name;
        //   this.pushUserCategory.push(element);
        //   this.pushUserCategorySections.push(user_category_name);
        //   this.groupname = this.pushUserCategorySections;
        //   console.log(this.pushUserCategory, 'ress');
        // }
      }
    );
  }

  //* ----------------------------  APIs Methods  --------------------------*//
  fee_amount_currency_short_form: any = 'INR';

  UpdateFeeAssignOne() {
    let feeAmount: any = this.firstFormGroup.controls['feeAmount'].value;
    let category_name: any =
      this.firstFormGroup.controls['selFeecategory'].value;
    let selectdate: any = this.firstFormGroup.controls['selectdate'].value;

    // Parsing the date string into a Date object
    let date = new Date(selectdate);

    // Extracting date components
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 to month since January is 0
    let day = ('0' + date.getDate()).slice(-2);
    let hours = ('0' + date.getHours()).slice(-2);
    let minutes = ('0' + date.getMinutes()).slice(-2);
    let seconds = ('0' + date.getSeconds()).slice(-2);

    // Constructing the formatted date string
    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    console.log(formattedDate);

    let dueforpayment: any =
      this.firstFormGroup.controls['dueforpayment'].value;
    let narration: any = this.firstFormGroup.controls['narration'].value;
    let selAcademicyear: any =
      this.firstFormGroup.controls['selAcademicyear'].value;

    // console.log(selAcademicyear,'sle');
    // console.log(category_name,'cat');

    const details: any = {
      scheduled_billing_date: this.formattedDatetoPass,
      type: 1,
    };

    this._apiservice
      .updateScheduleNewFeeDiscountCategory(
        this.country_code,
        this.customer_id,
        dueforpayment,
        selAcademicyear,
        category_name,
        feeAmount,
        this.category_wise_schedule_id,
        narration,
        this.user_id_login,
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
      this.firstFormGroup.controls['selectdate'].patchValue(`${days}`);
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
  //! -------------------------------  End  --------------------------------!//
}
