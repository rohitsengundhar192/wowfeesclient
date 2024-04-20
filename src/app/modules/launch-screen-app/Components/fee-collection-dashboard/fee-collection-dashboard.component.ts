import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { JwtauthService } from 'src/app/shared/services/api/jwtauth.service';

@Component({
  selector: 'app-fee-collection-dashboard',
  templateUrl: './fee-collection-dashboard.component.html',
  styleUrls: ['./fee-collection-dashboard.component.scss'],
})
export class FeeCollectionDashboardComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//

  //* -----------------------  Variable Declaration  -----------------------*//
  country_code: any;
  customer_id: any;
  user_id_login: any;
  customer_sub_domain_name: any;
  customer_logo_data: any;
  user_registration_login_approval_status: any;
  pinkPercentage: number = 40;
  lightbluePercentage: number = 60;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
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

    if (this.country_code != undefined) {
      this.getAcademicYear();
      this.createTable();
    }
  }

  //* ----------------------------  APIs Methods  --------------------------*//
  //Get Academic Year:
  passAcademicYear: any;
  getAcademicYear() {
    this._apiservice
      .getacademicyear(this.country_code, this.customer_id)
      .subscribe((res) => {
        // Assuming res.data is an array
        this.passAcademicYear = res.data.flatMap((item: any) => {
          return [
            { academic_year_start: 'Fy Yr - ' + item.academic_year_start },
          ];
        });
        console.log(this.passAcademicYear, 'passAcademicYear');
      });
  }

  createTable() {
    this._apiservice
      .createTable(this.country_code, this.customer_id)
      .subscribe((res) => {
        console.log(res, 'create Table');
      });
  }
  //* --------------------------  Public methods  --------------------------*//
  SelectAcademicYear(e: any) {}
  // Function to generate dynamic CSS string
  generatePieChartBackground(): string {
    return `conic-gradient(rgb(79,142,123) ${this.pinkPercentage}%, lightblue ${this.lightbluePercentage}%)`;
  }
  //* ------------------------------ Helper Function -----------------------*//
  // Pie
  public pieChartLabels: string[] = [
    'Chrome',
    'Safari',
    'Firefox',
    'Internet Explorer',
    'Other',
  ];
  public pieChartData: number[] = [40, 20, 20, 10, 10];
  public pieChartType: any = 'pie';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  //! -------------------------------  End  --------------------------------!//
}
