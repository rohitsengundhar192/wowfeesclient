import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { JwtauthService } from 'src/app/shared/services/api/jwtauth.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-edit-bus-fee',
  templateUrl: './edit-bus-fee.component.html',
  styleUrls: ['./edit-bus-fee.component.scss'],
})
export class EditBusFeeComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//

  //* -----------------------  Variable Declaration  -----------------------*//
  passForData: any;
  inputData: string[] = [];
  country_code: any;
  customer_id: any;
  user_id_login: any;
  customer_sub_domain_name: any;
  customer_logo_data: any;
  user_registration_login_approval_status: any;
  route_id: any;
  fee_amount_currency_short_form: any = 'INR';
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public loginDialogRef: MatDialogRef<EditBusFeeComponent>,
    private _apiservice: ApiService,
    private authService: JwtauthService,
    private _snackbar: SnackBarService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public EditedData: any
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
    console.log(this.EditedData.stop_details, 'EditedData');
    this.passForData = this.EditedData.stop_details;
    this.route_id = this.EditedData.route_id;
    this.initializeInputData();
    this.setInputValues();
  }

  //* ----------------------------  APIs Methods  --------------------------*//

  //* --------------------------  Public methods  --------------------------*//
  setInputValues(): void {
    // Iterate through the stop_details array
    for (let i = 0; i < this.passForData.length; i++) {
      // Find the input element corresponding to the stop_id
      const inputElement: any = document.querySelector(
        `input[stop-id="${this.passForData[i].stop_id}"]`
      );

      // If input element found, set its value to stop_fee
      if (inputElement) {
        inputElement.value = this.passForData[i].stop_fee;
      }
    }
  }
  initializeInputData() {
    // this.passForData.forEach((item: { stop_id: string | number }) => {
    //   this.inputData[item.stop_id] = '';
    // });
    // Initialize inputData as an array with empty strings
    this.inputData = new Array(this.passForData.length);
  }

  handleInputChange(event: any, item: any) {
    this.inputData[item.stop_id] = event.target.value;
  }

  saveData() {
    console.log(this.inputData);
    let body = {
      data: this.inputData,
    };
    this._apiservice
      .insertBusFee(
        this.country_code,
        this.customer_id,
        this.route_id,
        this.fee_amount_currency_short_form,
        body
      )
      .subscribe((_res) => {
        if (_res.statusCode == 200) {
          this._snackbar.success(_res.message);
          this.onNoClick();
        } else {
          this._snackbar.error(_res.message);
        }
      });
  }

  isSaveEnabled(): boolean {
    for (const key in this.inputData) {
      if (!this.inputData[key]) {
        return false; // Return false if any field is empty
      }
    }
    return true; // All fields are filled
  }

  //* ------------------------------ Helper Function -----------------------*//
  onNoClick(): void {
    this.loginDialogRef.close();
  }
  //! -------------------------------  End  --------------------------------!//
}