import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { LoginComponent } from './dialogs/login/login.component';
import { NoInternetComponent } from './dialogs/no-internet/no-internet.component';
import { UnsavedChangesGuard } from './guards/unsaved-changes/unsaved-changes.guard';
import { MaterialModule } from './material.module';
import { EllipsisPipe } from './pipes/ellipsis/ellipsis.pipe';
import { NoSanitizePipe } from './pipes/no-sanitize/no-sanitize.pipe';
import { SpinnerComponent } from './services/custom-spinner/spinner.component';
import { UserProfileComponentComponent } from './dialogs/user-profile-component/user-profile-component.component';
import { AddAllToPaginator } from './directives/All-to-paginator/add-all-to-paginator.directive';
import { SampleTableComponent } from './Table/sample-table/sample-table.component';

// import {
//   NgxMatDatetimePickerModule,
//   NgxMatNativeDateModule,
//   NgxMatTimepickerModule,
// } from '@angular-material-components/datetime-picker';
const BASE_MODULES = [
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  // NgxMatDatetimePickerModule,
  // NgxMatTimepickerModule,
  // NgxMatNativeDateModule,
];

const Guards = [UnsavedChangesGuard];

const Pipes = [
  EllipsisPipe,
  NoSanitizePipe,
  // DatePipe
];

const Directives: any[] = [AddAllToPaginator];

@NgModule({
  declarations: [
    Pipes,
    Directives,
    LoginComponent,
    SpinnerComponent,
    NoInternetComponent,
    UserProfileComponentComponent,
    SampleTableComponent,
  ],
  imports: [CommonModule, RouterModule, BASE_MODULES],
  providers: [Guards],
  exports: [Pipes, Directives, BASE_MODULES],
})
export class SharedModule {}
