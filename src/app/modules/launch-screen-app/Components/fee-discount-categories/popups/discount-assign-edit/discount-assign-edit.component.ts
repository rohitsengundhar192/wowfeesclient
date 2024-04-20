import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { JwtauthService } from 'src/app/shared/services/api/jwtauth.service';

@Component({
  selector: 'app-discount-assign-edit',
  templateUrl: './discount-assign-edit.component.html',
  styleUrls: ['./discount-assign-edit.component.scss']
})
export class DiscountAssignEditComponent implements OnInit{
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  firstFormGroup = this._formBuilder.group({
    firstCtrl: [''],
  });

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
  discount_category_name: any;
  type: any;
  discount_category_id: any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public loginDialogRef: MatDialogRef<DiscountAssignEditComponent>,
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

    this.discount_category_id = this.EditedData.discount_category_id;

    this.firstFormGroup.controls['firstCtrl'].setValue(
      this.EditedData.discount_category_name
    );

 }

  //* ----------------------------  APIs Methods  --------------------------*//
  FeeAssignEdit() {
    let category_name: any = this.firstFormGroup.controls['firstCtrl'].value;

    this._apiservice
      .updateDiscountCategory(
        this.country_code,
        this.customer_id,
        category_name,
        this.discount_category_id,
        this.user_id_login
      )
      .subscribe((res) => {
        console.log(res, 'updated successful');
        this.onNoClick();
      });
  }
  //* --------------------------  Public methods  --------------------------*//

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

