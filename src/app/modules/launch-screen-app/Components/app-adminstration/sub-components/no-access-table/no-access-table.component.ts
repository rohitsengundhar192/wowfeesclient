import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import * as XLSX from 'xlsx';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { DateTime } from 'luxon';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/shared/services/api/token.service';
// @ts-ignore
import { JwtauthService } from 'src/app/shared/services/api/jwtauth.service';
export interface PeriodicElement {
  col: string;
  col1: number;
}

@Component({
  selector: 'app-no-access-table',
  templateUrl: './no-access-table.component.html',
  styleUrls: ['./no-access-table.component.scss'],
})
export class NoAccessTableComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//

  //* -----------------------  Variable Declaration  -----------------------*//
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  ELEMENT_DATA: PeriodicElement[] = [];
  filterValue = '';

  country_code: any;
  customer_id: any;
  user_id_login: any;
  user_registration_login_approval_status: any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private _headerTitle: HeaderTitleService,
    private _apiService: ApiService,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _dataShare: DataSharingService,
    private _snackbar: SnackBarService,
    private _spiner: CustomSpinnerService,
    private authService: JwtauthService,
    private _tokenService: TokenService
  ) {}

  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    this._headerTitle.setTitle('App Administration - Payment Configuration ');
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login = token.user.user_id;
    this.user_registration_login_approval_status =
      token.user.user_registration_login_approval_status;

    if (this.country_code != undefined) {
      this.getTableData();
    }

    this._dataShare.share_data_bt_deny_to_access_table_data.subscribe((res) => {
      if (res == 2) {
        this.getTableData();
      }
    });
  }

  //* ----------------------------  APIs Methods  --------------------------*//
  getTableData() {
    this._apiService
      .getPermitAccessTable(this.country_code, this.customer_id)
      .subscribe((res) => {
        console.log(res, 'ress');
        this.dataSource.data = res.data;
      });
  }

  insertData() {
    let user_ids: any[] = [];
    let data1: any;
    this.rowValue.forEach((item: any) => {
      user_ids.push(item.user_id);

      data1 = {
        user_id: item.user_id,
      };
    });
    if (this.rowValue.length >= 1) {
      this._apiService
        .insertPermitAccess(this.country_code, this.customer_id, user_ids)
        .subscribe((_res) => {
          if (_res.statusCode == 200) {
            this._snackbar.success(_res.message);
            this.getTableData();
            this._dataShare.shareDataBtAccesstodenyTable(1);
            this.selection.selected.length=0;
            this.permitBtnDisable = true;
            user_ids=[];
          } else {
            this._snackbar.error(_res.message);
          }
        });
    }
  }
  //* --------------------------  Public methods  --------------------------*//

  //* ------------------------------ Helper Function -----------------------*//
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim();
    this.filterValue = this.filterValue.toLowerCase();
    this.dataSource.filter = this.filterValue;
  }
  rowValue: any;
  totalcolumn: any;
  selectedNum: any;
  divselected: any;
  numSelected: any = 0;
  isAllSelected() {
    this.numSelected = this.selection.selected.length;
    this.selectedNum = this.numSelected;
    this.divselected = this.numSelected / 5;
    this.rowValue = this.selection.selected;

    // console.log(this.rowValue.length, 'row');

    const numRows: any = this.dataSource.data.length;
    return this.numSelected === numRows;
  }
  permitBtnDisable: boolean = true;
  ngDoCheck(): void {
    if (this.selection.selected.length > 0) {
      this.permitBtnDisable = false;
    } else {
      this.permitBtnDisable = true;
    }
  }
  displayedColumns: string[] = ['col', 'col1'];

  dataSource: MatTableDataSource<PeriodicElement> =
    new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.translateMatPaginator(this.paginator);
  }

  table_json_data: any;
  onRowClicked(row: any) {}
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
  }
  showPageSizeOptions: boolean = true;

  translateMatPaginator(paginator: MatPaginator) {
    paginator._intl.firstPageLabel = 'First';
    paginator._intl.itemsPerPageLabel = 'Records Per Page';
    paginator._intl.lastPageLabel = 'Last';
    paginator._intl.nextPageLabel = 'Next';
    paginator._intl.previousPageLabel = 'Previous';
  }

  exportReport(fileName: any): void {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  }

  onPrint() {
    window.print();
  }

  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;
  public downloadAsPDF() {
    let pageIndex: number = Number(this.paginator.pageIndex);
    let pageSize: number = Number(this.paginator.pageSize);
    let currentPageEnd = pageSize * (pageIndex + 1);
    let currentPageStart = currentPageEnd - (pageSize - 1);
    let jwt_token = localStorage.getItem('access_token');
    let token1 = this._tokenService.decodeJwtToken(jwt_token);
    // console.log(token1, 'token');

    let app_name: string = token1.user.registered_educational_institution_name;
    let districtStatePincode: string = `${token1.user.city_district_county} ${token1.user.state_province} ${token1.user.pin_code};`;
    let addressline1_adressline2: string = ` ${token1.user.address_line_1} ${token1.user.address_line_2};`;

    let customer_logo = ` ${environment.ceph_URL}${token1.user.country_code}-${token1.user.customer_id}/${token1.user.customer_sub_domain_name}-icon-128x128.png`;
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
    var printContents = document.getElementById('pdfTable')!.innerHTML;
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
input[type=checkbox]{
            display:none
           }
          .mat-column-details,th,td,img{
            height: 50px;
            width: 50px;
            padding-left:10px;
          }
.mat-column-select{display:none}
</style>

          <div style="width:100%;  display: flex;flex-direction: row;align-items:center; margin-bottom:5px;margin-top:10px">
\ <img style="width:100px;height:100px" src="${customer_logo}" alt="app-logo" />           <div style=" display: flex;flex-direction: column; width:100%">
            <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">GETster.TECH PVT.LTD</span>
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">USERs WITH VALID ENTRY TICKET TO THE WOW CAMP SITE:</span>
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

  //! -------------------------------  End  --------------------------------!//
}
