import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaunchScreenAppRoutingModule } from './launch-screen-app-routing.module';
import { LaunchScreenAppComponent } from './launch-screen-app/launch-screen-app.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeeCollectionDashboardComponent } from './Components/fee-collection-dashboard/fee-collection-dashboard.component';
import { FeeDiscountCategoriesComponent } from './Components/fee-discount-categories/fee-discount-categories.component';
import { BusFeeManagementComponent } from './Components/bus-fee-management/bus-fee-management.component';
import { ScheduleFeeDiscountToStudentsComponent } from './Components/schedule-fee-discount-to-students/schedule-fee-discount-to-students.component';
import { TallyLeaderSyncComponent } from './Components/tally-leader-sync/tally-leader-sync.component';
import { FeeCollectionBalanceRemainderComponent } from './Components/fee-collection-balance-remainder/fee-collection-balance-remainder.component';
import { FeePaymentReceiptComponent } from './Components/fee-payment-receipt/fee-payment-receipt.component';
import { AppAdminstrationComponent } from './Components/app-adminstration/app-adminstration.component';
import { FeeCategoryComponent } from './Components/fee-discount-categories/sub-components/fee-category/fee-category.component';
import { DiscountCategoryComponent } from './Components/fee-discount-categories/sub-components/discount-category/discount-category.component';
import { FeeAssignNewComponent } from './Components/fee-discount-categories/popups/fee-assign-new/fee-assign-new.component';
import { FeeAssignEditComponent } from './Components/fee-discount-categories/popups/fee-assign-edit/fee-assign-edit.component';
import { DiscountAssignEditComponent } from './Components/fee-discount-categories/popups/discount-assign-edit/discount-assign-edit.component';
import { DiscountAssignNewComponent } from './Components/fee-discount-categories/popups/discount-assign-new/discount-assign-new.component';
import { StudentCategoryWiseComponent } from './Components/schedule-fee-discount-to-students/sub-components/student-category-wise/student-category-wise.component';
import { StudentWiseComponent } from './Components/schedule-fee-discount-to-students/sub-components/student-wise/student-wise.component';
import { ListCategoryComponent } from './Components/schedule-fee-discount-to-students/sub-components/list-category/list-category.component';
import { ScheduleNewCategoryComponent } from './Components/schedule-fee-discount-to-students/popup/schedule-new-category/schedule-new-category.component';
import { ScheduleEditCategoryComponent } from './Components/schedule-fee-discount-to-students/popup/schedule-edit-category/schedule-edit-category.component';
import { ListCategoryStudentComponent } from './Components/schedule-fee-discount-to-students/sub-components/list-category-student/list-category-student.component';
import { StudentCustomFeeComponent } from './Components/schedule-fee-discount-to-students/popup/student-custom-fee/student-custom-fee.component';
import { StudentDiscountFeeComponent } from './Components/schedule-fee-discount-to-students/popup/student-discount-fee/student-discount-fee.component';
import { RadioBtnComponent } from './Components/schedule-fee-discount-to-students/popup/radio-btn/radio-btn.component';
import { TestingComponent } from './Components/testing/testing.component';
import { StudentCustomEditFeeComponent } from './Components/schedule-fee-discount-to-students/popup/student-custom-edit-fee/student-custom-edit-fee.component';
import { StudentDiscountEditFeeComponent } from './Components/schedule-fee-discount-to-students/popup/student-discount-edit-fee/student-discount-edit-fee.component';
import { DueDateRemaindersComponent } from './Components/fee-collection-balance-remainder/sub-components/due-date-remainders/due-date-remainders.component';
import { DueAmountRemaindersComponent } from './Components/fee-collection-balance-remainder/sub-components/due-amount-remainders/due-amount-remainders.component';
import { DueStudentCategoryWiseComponent } from './Components/fee-collection-balance-remainder/sub-components/due-date-remainders/min-components/due-student-category-wise/due-student-category-wise.component';
import { DueStudentWiseComponent } from './Components/fee-collection-balance-remainder/sub-components/due-date-remainders/min-components/due-student-wise/due-student-wise.component';
import { CategoryWiseCategogyComponent } from './Components/fee-collection-balance-remainder/sub-components/due-date-remainders/other-components/category-wise-categogy/category-wise-categogy.component';
import { StudentWiseCategogyComponent } from './Components/fee-collection-balance-remainder/sub-components/due-date-remainders/other-components/student-wise-categogy/student-wise-categogy.component';
import { DueDateScheduleEditComponent } from './Components/fee-collection-balance-remainder/sub-components/due-date-remainders/popups/due-date-schedule-edit/due-date-schedule-edit.component';
import { DueDateScheduleNewComponent } from './Components/fee-collection-balance-remainder/sub-components/due-date-remainders/popups/due-date-schedule-new/due-date-schedule-new.component';
import { AccessControlComponent } from './Components/app-adminstration/sub-components/access-control/access-control.component';
import { PaymentConfigurationComponent } from './Components/app-adminstration/sub-components/payment-configuration/payment-configuration.component';
import { NoAccessTableComponent } from './Components/app-adminstration/sub-components/no-access-table/no-access-table.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { FeeParticularsTableComponent } from './Components/fee-payment-receipt/tables-component/fee-particulars-table/fee-particulars-table.component';
import { PaymentReceiptParticularsTableComponent } from './Components/fee-payment-receipt/tables-component/payment-receipt-particulars-table/payment-receipt-particulars-table.component';
import { QRCodeModule } from 'angularx-qrcode';
import { StopTableComponent } from './Components/bus-fee-management/sub-components/stop-table/stop-table.component';
import { EditBusFeeComponent } from './Components/bus-fee-management/popup/edit-bus-fee/edit-bus-fee.component';
import { HistoryBusFeeComponent } from './Components/bus-fee-management/popup/history-bus-fee/history-bus-fee.component';
// import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
@NgModule({
  declarations: [
    LaunchScreenAppComponent,
    FeeCollectionDashboardComponent,
    FeeDiscountCategoriesComponent,
    BusFeeManagementComponent,
    ScheduleFeeDiscountToStudentsComponent,
    TallyLeaderSyncComponent,
    FeeCollectionBalanceRemainderComponent,
    FeePaymentReceiptComponent,
    AppAdminstrationComponent,
    FeeCategoryComponent,
    DiscountCategoryComponent,
    FeeAssignNewComponent,
    FeeAssignEditComponent,
    DiscountAssignEditComponent,
    DiscountAssignNewComponent,
    StudentCategoryWiseComponent,
    StudentWiseComponent,
    ListCategoryComponent,
    ScheduleNewCategoryComponent,
    ScheduleEditCategoryComponent,
    ListCategoryStudentComponent,
    StudentCustomFeeComponent,
    StudentDiscountFeeComponent,
    RadioBtnComponent,
    TestingComponent,
    StudentCustomEditFeeComponent,
    StudentDiscountEditFeeComponent,
    DueDateRemaindersComponent,
    DueAmountRemaindersComponent,
    DueStudentCategoryWiseComponent,
    DueStudentWiseComponent,
    CategoryWiseCategogyComponent,
    StudentWiseCategogyComponent,
    DueDateScheduleEditComponent,
    DueDateScheduleNewComponent,
    AccessControlComponent,
    PaymentConfigurationComponent,
    NoAccessTableComponent,
    FeeParticularsTableComponent,
    PaymentReceiptParticularsTableComponent,
    StopTableComponent,
    EditBusFeeComponent,
    HistoryBusFeeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LaunchScreenAppRoutingModule,
    ColorPickerModule,
    QRCodeModule,
    
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    
  ],
})
export class LaunchScreenAppModule {}
