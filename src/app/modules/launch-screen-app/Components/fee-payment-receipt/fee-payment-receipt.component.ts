import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { CephService } from 'src/app/shared/services/api/ceph.service';
import { JwtauthService } from 'src/app/shared/services/api/jwtauth.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-fee-payment-receipt',
  templateUrl: './fee-payment-receipt.component.html',
  styleUrls: ['./fee-payment-receipt.component.scss'],
})
export class FeePaymentReceiptComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//
  @ViewChild('downloadableContent') downloadableContent!: ElementRef;
  //* -----------------------  Decorated Methods  --------------------------*//

  //* -----------------------  Variable Declaration  -----------------------*//
  cardbgclrchange: any;
  cardtext1clrchange: any;
  cardtext2clrchange: any;
  public color: string = '#1FB7E8';
  public color1: string = '#ffffff';
  public color2: string = '#ffffff';
  country_code: any;
  customer_id: any;
  user_id_login: any;
  user_registration_login_approval_status: any;
  gallery_c_file_id: any;
  bucketName: any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private _apiservice: ApiService,
    private authService: JwtauthService,
    private _snackbar: SnackBarService,
    private _cephService: CephService,
    private _spinner: CustomSpinnerService
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
    this.bucketName = `${this.country_code}-${this.customer_id}`;
  }

  //* ----------------------------  APIs Methods  --------------------------*//
  onUploadFileCephStorage() {
    this._spinner.open();

    if (this.getFileUpload != undefined) {
      let photoFormData: any = new FormData();
      photoFormData.append('is_uploaded_created_via_customapp', false);
      photoFormData.append('app_id', 21);
      photoFormData.append('app_type', 0);
      photoFormData.append('file_name', 'unsigned_form');
      photoFormData.append('attachments', this.getFileUpload);
      photoFormData.append('bucket_name', this.bucketName);

      this._cephService.createFile(photoFormData).subscribe((res) => {
        console.log(res, 'res');

        this.gallery_c_file_id = res.data[0].cloud_file_id;
        if (res?.statusCode == 200) {
          this._snackbar.success(res.message);
        }

        const details: any = {
          background_color: this.cardbgclrchange || this.color,
          text_color1: this.cardtext1clrchange || this.color1,
          text_color2: this.cardtext2clrchange || this.color2,
          cloud_file_id: this.gallery_c_file_id,
        };

        if (this.gallery_c_file_id != undefined) {
          this._apiservice
            .insertColors(
              this.country_code,
              this.customer_id,
              this.user_id_login,
              details
            )
            .subscribe((_res) => {
              console.log(_res, 'inserted data');
              if (_res.statusCode == 200) {
                this._snackbar.success(_res.message);
                this._spinner.close();
              } else {
                this._snackbar.error(_res.message);
              }
            });
        } else {
          this._snackbar.success('Kindly upload your Logo/Image');
        }
      });
    } else {
      this._snackbar.success('Kindly upload your Logo/Image');
      this._spinner.close();
    }
  }

  insertColors() {
    const details: any = {
      background_color: this.cardbgclrchange || this.color,
      text_color1: this.cardtext1clrchange || this.color1,
      text_color2: this.cardtext2clrchange || this.color2,
      cloud_file_id: 1,
    };
    this._apiservice
      .insertColors(
        this.country_code,
        this.customer_id,
        this.user_id_login,
        details
      )
      .subscribe((_res) => {
        console.log(_res, 'inserted data');
        if (_res.statusCode == 200) {
          this._snackbar.success(_res.message);
        } else {
          this._snackbar.error(_res.message);
        }
      });
  }
  //* --------------------------  Public methods  --------------------------*//

  getFileUpload: any;
  duration: any;
  time: any;
  // disablefileuploadimage: boolean = true;
  public browseVideo(event: any) {
    this.time = event.timeStamp;
    const timeStampInSeconds = event.timeStamp / 1000;
    const file = event.target.files[0];
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      this.duration = video.duration.toFixed(2);
    };
    video.src = URL.createObjectURL(file);

    let e = event.target as HTMLInputElement;
    if (e.files && e.files[0]) {
      this.getFileUpload = e.files[0];
    }
  }

  downloadAsImage() {
    html2canvas(this.downloadableContent.nativeElement).then((canvas) => {
      // Convert the canvas image to a data URL
      const image = canvas.toDataURL('image/jpeg');

      // Create a temporary link element
      const link = document.createElement('a');
      link.download = 'downloaded_image.jpg';
      link.href = image;

      // Simulate a click on the link to initiate the download
      link.click();
    });
  }

  cardbgcolor(ev: any) {
    this.cardbgclrchange = ev;
    console.log(this.cardbgclrchange, 'bg');
  }

  lastImageUrl: any = null;
  lastVideoUrl: any = null;
  lastFile: any = null;
  notallowed: boolean = false;
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const fileSize = file.size / 1024 / 1024; // File size in MB
    this.notallowed = true;

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.lastImageUrl = reader.result as string;
          this.lastVideoUrl = null;
          this.lastFile = file;
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.lastVideoUrl = reader.result as string;
          this.lastImageUrl = null;
          this.lastFile = file;
        };
        reader.readAsDataURL(file);
      }
    }
  }
  cardtext1clr(ev: any) {
    this.cardtext1clrchange = ev;
    console.log(this.cardtext1clrchange, 'text 1');
  }
  cardtext2clr(ev: any) {
    this.cardtext2clrchange = ev;
    console.log(this.cardtext2clrchange, 'text 2');
  }
  public downloadAsPDF11() {
    const printWindow: any = window.open('', '_blank', 'width=768,height=auto');
    const printableContent = this.downloadableContent.nativeElement.outerHTML;

    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            /* Add styles for print */
            @media print {
              /* Add your print styles here */
              /* For example: */
              .school-name {
                font-family: Inter;
                margin-left: 5px;
                text-shadow: 0 0 3px #000000;
                font-size: 25px;
              }
              .school-address {
                font-family: Inter;
                margin-left: 5px;
                text-shadow: 0 0 1px #000000;
                font-size: 15px;
              }
              .image-container {
                /* Add any print-specific styles for image container */
              }
            }
          </style>
        </head>
        <body>
          ${printableContent}
        </body>
      </html>
    `);

    printWindow.document.close();

    // Add a timeout to ensure the content is fully loaded before showing the print dialog
    setTimeout(() => {
      printWindow.print();
    }, 1000); // Adjust the timeout as needed
  }

  //* ------------------------------ Helper Function -----------------------*//

  //! -------------------------------  End  --------------------------------!//
}
