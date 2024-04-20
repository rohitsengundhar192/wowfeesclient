import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api/api.service';

import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import * as XLSX from 'xlsx';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserProfileComponentComponent } from 'src/app/shared/dialogs/user-profile-component/user-profile-component.component';
import { TokenService } from 'src/app/shared/services/api/token.service';
import { environment } from 'src/environments/environment';
import { DateTime } from 'luxon';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import { JwtauthService } from 'src/app/shared/services/api/jwtauth.service';

@Component({
  selector: 'app-history-bus-fee',
  templateUrl: './history-bus-fee.component.html',
  styleUrls: ['./history-bus-fee.component.scss'],
})
export class HistoryBusFeeComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//

  //* -----------------------  Variable Declaration  -----------------------*//
  country_code: any;
  customer_id: any;
  user_id_login: any;
  customer_sub_domain_name: any;
  customer_logo_data: any;
  user_registration_login_approval_status: any;
  tables: any;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  route_id: any;
  passEffectiveDatetime: any;
  route_name_identity_number:any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public loginDialogRef: MatDialogRef<HistoryBusFeeComponent>,
    private _apiservice: ApiService,
    private authService: JwtauthService,
    private _tokenService: TokenService,

    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public historyData: any
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

    console.log(this.historyData, 'historyData');
    this.route_name_identity_number = this.historyData.route_name_identity_number;

    if (this.historyData.route_id != undefined) {
      this.route_id = this.historyData.route_id;

      this._apiservice
        .getEffectiveDates(
          this.country_code,
          this.customer_id,
          this.historyData.route_id
        )
        .subscribe((res) => {
          this.passEffectiveDatetime = res.data;
          console.log(this.passEffectiveDatetime, 'this.historyData.route_id');
        });
    }
  }

  //* ----------------------------  APIs Methods  --------------------------*//
  //Get Academic Year:

  //* --------------------------  Public methods  --------------------------*//
  SelectEffectiveDateTime(e: any) {
    console.log(e, 'ee');

    this._apiservice
      .getRoutesHistory(
        this.country_code,
        this.customer_id,
        this.user_id_login,
        this.route_id,
        e.effective_from_datetime
      )
      .subscribe((res) => {
        console.log(res.data[0].stop_details, 'ree');
        this.dataSource.data = res.data[0].stop_details;
      });
  }

  //* ------------------------------ Helper Function -----------------------*//
  onNoClick(): void {
    this.loginDialogRef.close();
  }
  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  displayedColumns: string[] = ['col1', 'col2', 'col3', 'col4'];
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
  //! -------------------------------  End  --------------------------------!//
}
export interface PeriodicElement {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
}
