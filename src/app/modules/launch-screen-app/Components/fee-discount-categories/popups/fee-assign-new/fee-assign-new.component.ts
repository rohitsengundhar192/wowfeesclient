import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { JwtauthService } from 'src/app/shared/services/api/jwtauth.service';

interface Food {
  value: any;
  viewValue: string;
}
@Component({
  selector: 'app-fee-assign-new',
  templateUrl: './fee-assign-new.component.html',
  styleUrls: ['./fee-assign-new.component.scss'],
})
export class FeeAssignNewComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
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
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public loginDialogRef: MatDialogRef<FeeAssignNewComponent>,
    private _formBuilder: FormBuilder,
    private _apiservice: ApiService,
    private authService: JwtauthService
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
  }

  //* ----------------------------  APIs Methods  --------------------------*//
  InsertFeeAssign() {
    let category_name: any = {
      category_name: this.firstFormGroup.controls['firstCtrl'].value,
    };

    this._apiservice
      .insertFeeCategory(
        this.country_code,
        this.customer_id,
        category_name.category_name,
        this.type
      )
      .subscribe((res) => {
        console.log(res, 'inserted table');

        this.onNoClick();
      });
  }
  //* --------------------------  Public methods  --------------------------*//
  SelectFeeCategory(e: any) {
    console.log(e, 'selected category');
    this.type = e.value;
    if (this.type != undefined) {
      this.btndisable = false;
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

  //* ------------------------------ Helper Function -----------------------*//
  ngDoCheck(): void {
    this.getDataTypedInInput();
  }
  onNoClick(): void {
    this.loginDialogRef.close();
  }
  //! -------------------------------  End  --------------------------------!//
}
