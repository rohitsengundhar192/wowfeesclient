import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IframeService } from './shared/services/iframe/iframe.service';
import { StyleManager } from './shared/services/style-manager/style-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private _iframeService: IframeService,
    private styleManager: StyleManager
  ) {}
  baseOrigin: string = 'http://localhost:4200';
  ngAfterViewInit(): void {
    window.addEventListener('message', (e) => {
      // if (e.origin == this.baseOrigin) {
      //   let parentData = JSON.parse(JSON.parse(JSON.stringify(e.data)));

      //   this._iframeService.getIframeMessages(parentData);
      //   for (const key in parentData) {
      //     if (Object.prototype.hasOwnProperty.call(parentData, key)) {
      //       const value = parentData[key];
      //       localStorage.setItem(key, value);
      //     }
      //   }

      //   // this.sendMessage('Received From Child', e.origin);
      // }
    });

    window.addEventListener('load', (e) => {
      this.sendMessage('Received From Child', this.baseOrigin);
    });
  }

  sendMessage(body: any, targetOrigin: string) {
    // Make sure you are sending a string, and to stringify JSON
    window.parent.postMessage(JSON.stringify(body), targetOrigin);
  }

  ngOnInit() {
    // this._iframeService.getIframeEmit.subscribe((res) => {
    //   // this.toggleDarkTheme();
    //   this.styleManager.toggleDarkTheme();
    // });
    // this._iframeService.sendIframeEmit.subscribe((res) => {
    //   console.log('Child', res);
    // });
  }

  ngOnDestroy() {
    // if (this.mySubscription) {
    //   this.mySubscription.unsubscribe();
    // }
  }
}
