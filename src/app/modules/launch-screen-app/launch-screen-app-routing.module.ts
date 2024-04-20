import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LaunchScreenAppComponent } from './launch-screen-app/launch-screen-app.component';
import { FeeCollectionDashboardComponent } from './Components/fee-collection-dashboard/fee-collection-dashboard.component';
import { FeeDiscountCategoriesComponent } from './Components/fee-discount-categories/fee-discount-categories.component';
import { BusFeeManagementComponent } from './Components/bus-fee-management/bus-fee-management.component';
import { ScheduleFeeDiscountToStudentsComponent } from './Components/schedule-fee-discount-to-students/schedule-fee-discount-to-students.component';
import { TallyLeaderSyncComponent } from './Components/tally-leader-sync/tally-leader-sync.component';
import { FeeCollectionBalanceRemainderComponent } from './Components/fee-collection-balance-remainder/fee-collection-balance-remainder.component';
import { FeePaymentReceiptComponent } from './Components/fee-payment-receipt/fee-payment-receipt.component';
import { AppAdminstrationComponent } from './Components/app-adminstration/app-adminstration.component';
import { TestingComponent } from './Components/testing/testing.component';

const routes: Routes = [
  { path: '', redirectTo: 'launch-screen', pathMatch: 'full' },
  {
    path: 'launch-screen',
    component: LaunchScreenAppComponent,
    children: [
      {
        path: '',
        redirectTo: 'fee-collection-dashboard',
        pathMatch: 'full',
      },
      {
        path: 'fee-collection-dashboard',
        component: FeeCollectionDashboardComponent,
      },
      {
        path: 'fee-discount-categories',
        component: FeeDiscountCategoriesComponent,
      },

      {
        path: 'bus-fee-management',
        component: BusFeeManagementComponent,
      },
      {
        path: 'schedule-fee-discount-to-students',
        component: ScheduleFeeDiscountToStudentsComponent,
      },

      {
        path: 'tally-leader-sync',
        component: TallyLeaderSyncComponent,
      },
      {
        path: 'fee-collection-balance-remainder',
        component: FeeCollectionBalanceRemainderComponent,
      },
      {
        path: 'fee-payment-receipt',
        component: FeePaymentReceiptComponent,
      },
      {
        path: 'app-adminstration',
        component: AppAdminstrationComponent,
      },
      {
        path: 'testing',
        component: TestingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaunchScreenAppRoutingModule {}
