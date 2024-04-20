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
  selector: 'app-student-custom-edit-fee',
  templateUrl: './student-custom-edit-fee.component.html',
  styleUrls: ['./student-custom-edit-fee.component.scss'],
})
export class StudentCustomEditFeeComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  firstFormGroup = this._formBuilder.group({
    // firstCtrl: ['', Validators.required],
    selectdate: new FormControl('', Validators.required),
    selAcademicyear: ['', Validators.required],
    selFeecategory: ['', Validators.required],
    feeAmount: ['', Validators.required],
    dueforpayment: ['', Validators.required],
    narration: ['', Validators.required],
    selStudent: ['', Validators.required],
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
  passDataSelectStudent: any;
  student_wise_schedule_id: any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public loginDialogRef: MatDialogRef<StudentCustomEditFeeComponent>,
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
    const formattedDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
    // console.log(formattedDate);
    this.formattedDatetoPass = formattedDate;

    this.events.push(`${type}: ${formattedDate}`);
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

      this._apiservice
        .getNameByUserID(
          this.country_code,
          this.customer_id,
          this.EditedData.datass.tableData.user_id
        )
        .subscribe((res) => {
          this.passDataSelectStudent = res.data[0].details;
          console.log('====================================');
          console.log(this.passDataSelectStudent);
          console.log('====================================');
          this.firstFormGroup.controls['selStudent'].setValue(
            this.passDataSelectStudent[0].user_id
          );
        });
    }

    let FormatDated = formatDate(
      this.EditedData.datass.tableData.scheduled_billing_date,
      'yyyy-MM-dd',
      'en-US'
    );
    console.log(FormatDated, 'formattedDate');

    if (this.EditedData != undefined) {
      this.student_wise_schedule_id =
        this.EditedData.datass.tableData.student_wise_schedule_id;
      this.firstFormGroup.controls['selAcademicyear'].patchValue(
        this.EditedData.datass.tableData.academic_year
      );
      this.firstFormGroup.controls['selFeecategory'].patchValue(
        this.EditedData.datass.tableData.fee_category_id
      );
      this.firstFormGroup.controls['feeAmount'].patchValue(
        this.EditedData.datass.tableData.fee_amount
      );
      this.firstFormGroup.controls['dueforpayment'].patchValue(
        this.EditedData.datass.tableData.due_for_payment_days
      );
      this.firstFormGroup.controls['narration'].patchValue(
        this.EditedData.datass.tableData.narration
      );
      this.firstFormGroup.controls['selectdate'].setValue(FormatDated);
      this.groupname = this.EditedData.datass.tableData.c_name;
    }
  }

  //* ----------------------------  APIs Methods  --------------------------*//
  fee_amount_currency_short_form: any = 'INR';

  UpdateFeeAssignCustom() {
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

    const details: any = {
      scheduled_billing_date: formattedDate,
      categoryDiscountORCustom: 1,
    };

    console.log(
      this.country_code,
      this.customer_id,
      dueforpayment,
      selAcademicyear,
      category_name,
      feeAmount,
      this.student_wise_schedule_id,
      narration,
      this.user_id_login,
      details
    );

    this._apiservice
      .updateScheduleEditFeeCustomStudentWise(
        this.country_code,
        this.customer_id,
        dueforpayment,
        selAcademicyear,
        category_name,
        feeAmount,
        this.student_wise_schedule_id,
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

  discount_category_id: any = null;
  discount_amount: any = null;
  discount_amount_currency_short_form: any = null;
  selectedUserId: any;

  //Get Academic Year:
  passAcademicYear: any;
  getAcademicYear() {
    this._apiservice
      .getacademicyear(this.country_code, this.customer_id)
      .subscribe((res) => {
        this.passAcademicYear = res.data;
        // console.log(this.passAcademicYear, 'passAcademicYear');
      });
  }
  //Get fee category:
  passDiscountCategory: any;
  getFeeCategory() {
    this._apiservice
      .getFeeCategoryTable(this.country_code, this.customer_id)
      .subscribe((res) => {
        // console.log(res, 'fee category');

        this.passDiscountCategory = res.data;
      });
  }
  //* --------------------------  Public methods  --------------------------*//
  selectStudent(e: any) {
    console.log(e.user_id, 'ee');
    this.selectedUserId = e.user_id;
  }
  calanderTypeMultiorSingleDatetoSelect: any;
  SelectFeeCategory(e: any) {
    // console.log(e, 'selected category');
    this.type = e.fee_category_id;
    // console.log(this.type, 'type');

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
      // console.log(this.daysSelected[i], 'di');
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
