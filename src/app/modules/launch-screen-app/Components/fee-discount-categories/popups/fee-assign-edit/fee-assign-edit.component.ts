import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { JwtauthService } from 'src/app/shared/services/api/jwtauth.service';
interface Food {
  value: any;
  viewValue: string;
}
@Component({
  selector: 'app-fee-assign-edit',
  templateUrl: './fee-assign-edit.component.html',
  styleUrls: ['./fee-assign-edit.component.scss'],
})
export class FeeAssignEditComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  firstFormGroup = this._formBuilder.group({
    firstCtrl: [''],
    sel: [''],
  });
  foods: Food[] = [
    { value: 0, viewValue: 'Common Fee, Recurring Fee Payment' },
    { value: 1, viewValue: 'Common Fee, One Time Fee Payment' },
    { value: 2, viewValue: 'Common Fee, Bus Fee Payment' },
    { value: 3, viewValue: 'Custom Fee / Penality Payment' },
  ];
  //* -----------------------  Variable Declaration  -----------------------*//
  groupname: any;
  country_code: any;
  customer_id: any;
  user_id_login: any;
  customer_sub_domain_name: any;
  customer_logo_data: any;
  user_registration_login_approval_status: any;
  btndisableNgdocheck: boolean = true;
  selectedCategory: any;
  fee_category_name: any;
  type: any;
  fee_category_id: any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public loginDialogRef: MatDialogRef<FeeAssignEditComponent>,
    private _formBuilder: FormBuilder,

    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public EditedData: any,
    private authService: JwtauthService,
    private _apiservice: ApiService
  ) {}

  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login = token.user.user_id;
    this.user_registration_login_approval_status =
      token.user.user_registration_login_approval_status;

    console.log(this.EditedData);

    this.fee_category_id = this.EditedData.fee_category_id;

    this.firstFormGroup.controls['firstCtrl'].setValue(
      this.EditedData.fee_category_name
    );

    this.firstFormGroup.controls['sel'].patchValue(this.EditedData.type);
  }

  //* ----------------------------  APIs Methods  --------------------------*//
  FeeAssignEdit() {
    let selectedDAta: any = this.firstFormGroup.controls['sel'].value;
    let category_name: any = this.firstFormGroup.controls['firstCtrl'].value;

    this._apiservice
      .updateFeeCategory(
        this.country_code,
        this.customer_id,
        category_name,
        selectedDAta,
        this.fee_category_id,
        this.user_id_login
      )
      .subscribe((res) => {
        console.log(res, 'updated successful');
        this.onNoClick();
      });
  }
  //* --------------------------  Public methods  --------------------------*//
  SelectFeeCategory(e: any) {
    console.log(e, 'selected category');
  }

  selectType() {
    this.selectedCategory = this.foods;
  }
  //* ------------------------------ Helper Function -----------------------*//
  getDataTypedInInput() {
    const length: any = this.firstFormGroup.controls['firstCtrl'].value?.length;
    if (length > 0) {
      this.btndisableNgdocheck = false;
    } else {
      this.btndisableNgdocheck = true;
    }
  }
  ngDoCheck(): void {
    this.getDataTypedInInput();
  }
  onNoClick(): void {
    this.loginDialogRef.close();
  }
  //! -------------------------------  End  --------------------------------!//
}
