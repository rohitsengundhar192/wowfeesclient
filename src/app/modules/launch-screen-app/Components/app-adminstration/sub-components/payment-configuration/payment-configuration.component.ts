import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-payment-configuration',
  templateUrl: './payment-configuration.component.html',
  styleUrls: ['./payment-configuration.component.scss'],
})
export class PaymentConfigurationComponent implements OnInit {
  public myAngularxQrCode: string = '';
  public qrCodeDownloadLink: SafeUrl = '';

  constructor() {
    this.generateQRCode(); // Generate QR code initially
  }

  ngOnInit(): void {}

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  generateQRCode() {
    // Generate a random number to use as QR code data string
    const randomNumber = Math.floor(Math.random() * 1000000); // Generate random number between 0 and 999999
    this.myAngularxQrCode = randomNumber.toString();
  }

  scanNew() {
    this.generateQRCode(); // Call generateQRCode() when "SCAN NEW" button is clicked
  }
}
