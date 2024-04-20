import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/shared/dialogs/login/login.component';
import { JwtauthService } from 'src/app/shared/services/api/jwtauth.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';

@Component({
  selector: 'app-due-date-remainders',
  templateUrl: './due-date-remainders.component.html',
  styleUrls: ['./due-date-remainders.component.scss'],
})
export class DueDateRemaindersComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//

  //* -----------------------  Variable Declaration  -----------------------*//
  hidecontent: boolean = false;
  country_code: any;
  customer_id: any;
  user_id_login: any;
  user_registration_login_approval_status: any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public dialog: MatDialog,
    private _dataShare: DataSharingService,
    private _headerTitle: HeaderTitleService,
    private authService: JwtauthService,
    private data_sharing: DataSharingService
  ) {}

  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    this._headerTitle.setTitle('Fee Collection Balance Reminder');
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login = token.user.user_id;
    this.user_registration_login_approval_status =
      token.user.user_registration_login_approval_status;
  }

  //* ----------------------------  APIs Methods  --------------------------*//

  //* --------------------------  Public methods  --------------------------*//

  //* ------------------------------ Helper Function -----------------------*//

  //! -------------------------------  End  --------------------------------!//
}
