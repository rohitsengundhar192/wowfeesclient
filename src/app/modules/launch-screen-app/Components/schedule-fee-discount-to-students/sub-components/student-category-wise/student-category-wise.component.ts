import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
// import { AccessControlLoginComponent } from './../access-control-login/access-control-login.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';

import { SelectionModel } from '@angular/cdk/collections';

import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { LoginComponent } from 'src/app/shared/dialogs/login/login.component';
import { JwtauthService } from 'src/app/shared/services/api/jwtauth.service';

import { ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TokenService } from 'src/app/shared/services/api/token.service';
import { environment } from 'src/environments/environment';
import { DateTime } from 'luxon';
import { ScheduleNewCategoryComponent } from '../../popup/schedule-new-category/schedule-new-category.component';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { ScheduleEditCategoryComponent } from '../../popup/schedule-edit-category/schedule-edit-category.component';
import { DeleteConfirmDialogComponent } from 'src/app/shared/dialogs/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-student-category-wise',
  templateUrl: './student-category-wise.component.html',
  styleUrls: ['./student-category-wise.component.scss'],
})
export class StudentCategoryWiseComponent implements OnInit {
  //* ------------------------------  START  ------------------------------ *//

  //* ------------------------------  Variable Declaration  ------------------------------ *//

  country_code: any;
  customer_id: any;
  user_registration_login_approval_status: any = 3;
  hidecontent: boolean = false;
  tables: any;
  user_id_login: any;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  customer_sub_domain_name: any;
  customer_logo_data: any;
  btnScheduleNew: boolean = true;
  radioRowValue: any;
  btnScheduleEdit: boolean = true;
  category_wise_schedule_id: any;
  //* ------------------------------  Constructor  ------------------------------ *//

  constructor(
    public dialog: MatDialog,
    private _headerTitle: HeaderTitleService,
    private formbuilder: UntypedFormBuilder,
    private _datashare: DataSharingService,
    private authService: JwtauthService,
    private _snackbar: SnackBarService,
    private _headertitle: HeaderTitleService,
    private _cdf: ChangeDetectorRef,
    private _tokenService: TokenService,
    private _apiservice: ApiService
  ) {}
  user_category_id: any;
  //* ------------------------------  Lifecycle Hooks  ------------------------------ *//
  arr: any[] = [];
  ngOnInit(): void {
    this._headertitle.setTitle(`Access control of GETster Screens`);
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    console.log(token, 'token');

    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login = token.user.user_id;

    if (this.customer_id != undefined) {
      this.getScheduleNewFeeDiscountCategoryTable();
    }

    // this.user_registration_login_approval_status =
    //   token.user.user_registration_login_approval_status;

    if (this.user_registration_login_approval_status === 3) {
      this.hidecontent = false; // Show the HTML content
    } else {
      this.hidecontent = true; // Hide the HTML content

      const dialogRef = this.dialog.open(LoginComponent, {
        disableClose: true,
        height: 'auto',
        width: '350px',
        minWidth: '350px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.hidecontent = this.user_registration_login_approval_status !== 3;
      });
    }
    this._headerTitle.setTitle('Schedule Fee / Discount to Students');

    this._datashare.share_category_schedule_new_fee_discount_Data.subscribe(
      (res) => {
        if (res?.length > 0) {
          this.btnScheduleNew = false;
        } else {
          this.btnScheduleNew = true;
        }
      }
    );
  }

  //* ------------------------------  APIs Methods  ------------------------------ *//
  getScheduleNewFeeDiscountCategoryTable() {
    this._apiservice
      .getScheduleNewFeeDiscountCategoryTable(
        this.country_code,
        this.customer_id
      )
      .subscribe((res) => {
        console.log(res.data[0].details, 'tabe');

        this.dataSource.data = res.data[0].details;
      });
  }
  //* ------------------------------  Helper Function  ------------------------------ *//
  radioBtnData(e: any) {
    console.log(e, 'radioBtnData');
    this.radioRowValue = e;
    this.btnScheduleEdit = false;
    this.category_wise_schedule_id = e.category_wise_schedule_id;
  }
  scheduleNewDialogue() {
    const dialogRef = this.dialog.open(ScheduleNewCategoryComponent, {
      disableClose: true,
      height: '60%',
      width: '600px',
      minWidth: '250px',
      data: this.radioRowValue,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getScheduleNewFeeDiscountCategoryTable();
      this.btnScheduleNew = true;
    });
  }
  scheduleEditDialogue() {
    const dialogRef = this.dialog.open(ScheduleEditCategoryComponent, {
      disableClose: true,
      height: '60%',
      width: '600px',
      minWidth: '250px',
      data: this.radioRowValue,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getScheduleNewFeeDiscountCategoryTable();
      this.btnScheduleEdit = true;
    });
  }
  deleteParticipants() {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      disableClose: true,
      width: '400px',
      height: '150px',
      minWidth: '350px',
      data: this.radioRowValue,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res == 1) {
        this._apiservice
          .deleteScheduleNewFeeDiscountCategory(
            this.country_code,
            this.customer_id,
            this.category_wise_schedule_id,
            this.user_id_login
          )
          .subscribe((res) => {
            if (res.statusCode == 200) {
              this._snackbar.success('Data Deleted Succesful');
              this.btnScheduleEdit = true;
            }
            this.getScheduleNewFeeDiscountCategoryTable();
            
          });
      }
    });
  }
  //Table
  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  displayedColumns: string[] = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6'];
  onRowClicked(row: any) {}
  dataSource: MatTableDataSource<PeriodicElement> =
    new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;

  rowValue: any[] = [];

  table_json_data: any;

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
  }
  loadData() {}
  showPageSizeOptions: boolean = true;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.translateMatPaginator(this.paginator);
  }

  translateMatPaginator(paginator: MatPaginator) {
    paginator._intl.firstPageLabel = 'First';
    paginator._intl.itemsPerPageLabel = 'Records Per Page';
    paginator._intl.lastPageLabel = 'Last';
    paginator._intl.nextPageLabel = 'Next';
    paginator._intl.previousPageLabel = 'Previous';
  }

  exportReport(fileName: any): void {
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName);
  }

  onPrint() {
    window.print();
  }

  @ViewChild('pdfTable1', { static: false }) pdfTable1!: ElementRef;
  public downloadAsPDF11() {
    let pageIndex: number = Number(this.paginator.pageIndex);
    let pageSize: number = Number(this.paginator.pageSize);

    let currentPageEnd = pageSize * (pageIndex + 1);
    let currentPageStart = currentPageEnd - (pageSize - 1);
    // let category = this.cantegory_name;

    let jwt_token = localStorage.getItem('access_token');
    let token1 = this._tokenService.decodeJwtToken(jwt_token);
    // console.log(token1, 'token');

    let app_name: string = token1.user.registered_educational_institution_name;
    let districtStatePincode: string = `${token1.user.city_district_county} ${token1.user.state_province} ${token1.user.pin_code};`;
    let addressline1_adressline2: string = ` ${token1.user.address_line_1} ${token1.user.address_line_2};`;

    // let customer_logo = ` ${environment.ceph_URL}/${token1.user.country_code}-${token1.user.customer_id}/${token1.user.customer_sub_domain_name}-icon-128x128.png;`;
    let customer_logo = ` ${environment.ceph_URL}${token1.user.country_code}-${token1.user.customer_id}/${token1.user.customer_sub_domain_name}-icon-128x128.png`;
    // console.log(customer_logo, 'cust');

    const htmlToPrint =
      '' +
      '<style type="text/css">' +
      '.pageFooter {' +
      '    display: table-footer-group;' +
      '    counter-increment: page;' +
      '}' +
      '.pageFooter:after {' +
      '   content: "Page " counter(page)' +
      '}' +
      '</style>';
    var printContents = document.getElementById('pdfTable1')!.innerHTML;
    let popupWin: any = window.open(
      'Angular Large Table to pdf',
      '_blank',
      'width=768,height=auto'
    );

    popupWin.document.write(
      '<html><head>' +
        '<link rel="stylesheet" href="' +
        'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"/>' +
        '<style type="text/css">' +
        '.pageFooter {' +
        '    display: table-footer-group;' +
        '    counter-increment: page;' +
        '}' +
        '.pageFooter:after {' +
        '   content: "Page Number" counter(page)' +
        '}' +
        '.mat-table {' +
        '   width: 85%' +
        '}' +
        '.mat-radio-container {' +
        '   display: none' +
        '}' +
        '</style>' +
        `</head>

          <body onload="window.print()">
          <style>
          .mat-column-select{display:none}
          .matCellDef,th,td,img{
            height: 50px;
            width: 50px;
            padding-left:10px;

          }
          </style>

            <div style=" display: flex;flex-direction: row;align-items:center; margin-bottom:5px;margin-top:10px">
            <img style="width:100px;height:100px" src="${customer_logo}" alt="app-logo" />
            <div style=" display: flex;flex-direction: column; width:100%">
              <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">GETster.TECH PVT.LTD</span>
              <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">VOLUNTEERs AND AUTHORIZERs DATA FOR USERs REGISTERED UNDER USER CATEGORY: </span>
              <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase"> </span>
              <span style="text-align: center;font-size:14px;color:black;font-weight:600;">Records : ( ${currentPageStart} - ${currentPageEnd} of ${
          this.paginator.length
        } ) ${
          this.filterValue.length >= 1
            ? `(Filtered by -" ${this.filterValue} )`
            : ''
        } (${DateTime.local().toFormat('yyyy-MM-dd TT')})</span>
            </div>
            </div>

            ` +
        printContents +
        '</body>' +
        `
            <footer style="position: fixed; bottom: 0; width: 100%;">
            <div style=" display: flex;flex-direction: column; width:100%; align-items:center">
            <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">${addressline1_adressline2} </span>
            <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">${districtStatePincode}</span>
            </div>
            </footer>
          ` +
        '</html>'
    );
    popupWin.document.close();
  }
}
export interface PeriodicElement {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
}
