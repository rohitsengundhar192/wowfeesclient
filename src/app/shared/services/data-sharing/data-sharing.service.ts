import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  constructor() {}

  private Audit_trail = new BehaviorSubject<string | any>(undefined);
  audit_trail_data = this.Audit_trail.asObservable();

  updateAuditTrailData(data: string) {
    this.Audit_trail.next(data);
  }

  private Assigned_category = new BehaviorSubject<any>(undefined);
  assigned_category_data = this.Assigned_category.asObservable();

  updateAssignedCategoryData(data: any) {
    this.Assigned_category.next(data);
  }

  //Mine data Share
  private share_category_schedule_new_fee_discount = new BehaviorSubject<any>(
    undefined
  );
  share_category_schedule_new_fee_discount_Data =
    this.share_category_schedule_new_fee_discount.asObservable();

  shareCategoryScheduleNewFeeDiscount(data: any) {
    this.share_category_schedule_new_fee_discount.next(data);
  }

  private share_category_schedule_new_student = new BehaviorSubject<any>(
    undefined
  );
  share_category_schedule_new_student_Data =
    this.share_category_schedule_new_student.asObservable();

  shareCategoryScheduleNewStudent(data: any) {
    this.share_category_schedule_new_student.next(data);
  }

  private pass_category_schedule_new_discount = new BehaviorSubject<any>(
    undefined
  );
  pass_category_schedule_new_discount_Data =
    this.pass_category_schedule_new_discount.asObservable();

  passCategoryScheduleNewDiscount(data: any) {
    this.pass_category_schedule_new_discount.next(data);
  }

  private pass_closeid_dialogue_schedule_new = new BehaviorSubject<any>(
    undefined
  );
  pass_closeid_dialogue_schedule_new_Data =
    this.pass_closeid_dialogue_schedule_new.asObservable();

  passCloseIDDialogueScheduleNewData(data: any) {
    this.pass_closeid_dialogue_schedule_new.next(data);
  }

  private pass_usercategory_due_date_category_wise = new BehaviorSubject<any>(
    undefined
  );
  pass_usercategory_due_date_category_wise_data =
    this.pass_usercategory_due_date_category_wise.asObservable();

  passUsercategoryDueDateCategoryWise(data: any) {
    this.pass_usercategory_due_date_category_wise.next(data);
  }

  private pass_usercategory_due_date_student_wise = new BehaviorSubject<any>(
    undefined
  );
  pass_usercategory_due_date_student_wise_data =
    this.pass_usercategory_due_date_student_wise.asObservable();

  passUsercategoryDueDateStudentWise(data: any) {
    this.pass_usercategory_due_date_student_wise.next(data);
  }

  private share_data_bt_access_to_deny_table = new BehaviorSubject<any>(
    undefined
  );
  share_data_bt_access_to_deny_table_data =
    this.share_data_bt_access_to_deny_table.asObservable();

  shareDataBtAccesstodenyTable(data: any) {
    this.share_data_bt_access_to_deny_table.next(data);
  }

  private share_data_bt_deny_to_access_table = new BehaviorSubject<any>(
    undefined
  );
  share_data_bt_deny_to_access_table_data =
    this.share_data_bt_deny_to_access_table.asObservable();

  shareDataBtDenytoAccessTable(data: any) {
    this.share_data_bt_deny_to_access_table.next(data);
  }

  private share_data_stop_details = new BehaviorSubject<any>(undefined);
  share_data_stop_details_data = this.share_data_stop_details.asObservable();

  shareDataStopDetails(data: any) {
    this.share_data_stop_details.next(data);
  }

}
