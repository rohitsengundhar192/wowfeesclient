import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  customer_id: any;
  country_no: any;

  private httpClient: HttpClient;

  constructor(private http: HttpClient, private handler: HttpBackend) {
    this.getvalues();
    this.httpClient = new HttpClient(handler);
  }

  getvalues() {
    this.customer_id = localStorage.getItem('customer_id');
    this.country_no = localStorage.getItem('country_no');
  }

  //Fee Category

  getFeeCategoryTable(
    country_code: string,
    customer_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getFeeCategoryTable}?country_code=${country_code}&customer_id=${customer_id}`
    );
  }

  getDiscountCategoryStuTable(
    country_code: string,
    customer_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getDiscountCategoryStuTable}?country_code=${country_code}&customer_id=${customer_id}`
    );
  }

  insertFeeCategory(
    country_code: string,
    customer_id: number,
    fee_category_name: string,
    type: number
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.insertFeeCategory}?country_code=${country_code}&customer_id=${customer_id}&fee_category_name=${fee_category_name}&type=${type}`,
      name
    );
  }

  updateFeeCategory(
    country_code: string,
    customer_id: number,
    fee_category_name: string,
    type: number,
    fee_category_id: number,
    login_id: number
  ): Observable<any> {
    return this.http.put<any>(
      `${environment.updateFeeCategory}?country_code=${country_code}&customer_id=${customer_id}&fee_category_name=${fee_category_name}&type=${type}&fee_category_id=${fee_category_id}&login_id=${login_id}`,
      name
    );
  }

  //Discount category

  getDiscountCategoryTable(
    country_code: string,
    customer_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getDiscountCategoryTable}?country_code=${country_code}&customer_id=${customer_id}`
    );
  }
  createTable(country_code: string, customer_id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.createTable}?country_code=${country_code}&customer_id=${customer_id}`
    );
  }
  insertDiscoutCategory(
    country_code: string,
    customer_id: number,
    discount_category_name: string
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.insertDiscoutCategory}?country_code=${country_code}&customer_id=${customer_id}&discount_category_name=${discount_category_name}`,
      name
    );
  }

  updateDiscountCategory(
    country_code: string,
    customer_id: number,
    discount_category_name: string,
    discount_category_id: number,
    login_id: number
  ): Observable<any> {
    return this.http.put<any>(
      `${environment.updateDiscountCategory}?country_code=${country_code}&customer_id=${customer_id}&discount_category_name=${discount_category_name}&discount_category_id=${discount_category_id}&&login_id=${login_id}`,
      name
    );
  }

  //schedule fee discount to students:
  get_category_access(country_code: string, customer_id: number) {
    return this.http.get<any>(
      `${environment.get_category_access}?country_code=${country_code}&customer_id=${customer_id}`
    );
  }

  get_category(country_code: string, customer_id: number) {
    return this.http.get<any>(
      `${environment.get_category}?country_code=${country_code}&customer_id=${customer_id}`
    );
  }

  //getacademic year
  getacademicyear(country_code: string, customer_id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.getacademicyear}?country_code=${country_code}&customer_id=${customer_id}`
    );
  }

  //insert schedule new schedule fee discount category
  insertScheduleNewFeeDiscountCategory(
    country_code: string,
    customer_id: number,
    due_for_payment_days: number,
    academic_year: string,
    fee_category_id: number,
    fee_amount: number,
    fee_amount_currency_short_form: string,
    narration: string,
    details: any
  ) {
    return this.http.post<any>(
      `${environment.insertScheduleNewFeeDiscountCategory}?country_code=${country_code}&customer_id=${customer_id}&due_for_payment_days=${due_for_payment_days}&academic_year=${academic_year}&fee_category_id=${fee_category_id}&fee_amount=${fee_amount}&fee_amount_currency_short_form=${fee_amount_currency_short_form}&narration=${narration}`,
      details
    );
  }

  //update schedule new schedule fee discount category
  updateScheduleNewFeeDiscountCategory(
    country_code: string,
    customer_id: number,
    due_for_payment_days: number,
    academic_year: string,
    fee_category_id: number,
    fee_amount: number,
    category_wise_schedule_id: number,
    narration: string,
    login_id: number,
    details: any
  ): Observable<any> {
    return this.http.put<any>(
      `${environment.updateScheduleNewFeeDiscountCategory}?country_code=${country_code}&customer_id=${customer_id}&due_for_payment_days=${due_for_payment_days}&academic_year=${academic_year}&fee_category_id=${fee_category_id}&fee_amount=${fee_amount}&category_wise_schedule_id=${category_wise_schedule_id}&narration=${narration}&login_id=${login_id}`,
      details
    );
  }
  //update schedule Edit fee Cusom student wise
  updateScheduleEditFeeCustomStudentWise(
    country_code: string,
    customer_id: number,
    due_for_payment_days: number,
    academic_year: string,
    fee_category_id: number,
    fee_amount: number,
    student_wise_schedule_id: number,
    narration: string,
    login_id: number,
    details: any
  ): Observable<any> {
    return this.http.put<any>(
      `${environment.updateScheduleEditFeeCustomStudentWise}?country_code=${country_code}&customer_id=${customer_id}&due_for_payment_days=${due_for_payment_days}&academic_year=${academic_year}&fee_category_id=${fee_category_id}&fee_amount=${fee_amount}&student_wise_schedule_id=${student_wise_schedule_id}&narration=${narration}&login_id=${login_id}`,
      details
    );
  }
  //Get schedule new schedule fee discount category table

  getScheduleNewFeeDiscountCategoryTable(
    country_code: string,
    customer_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getScheduleNewFeeDiscountCategoryTable}?country_code=${country_code}&customer_id=${customer_id}`
    );
  }

  //delete schedule new schedule fee discount category
  deleteScheduleNewFeeDiscountCategory(
    country_code: any,
    customer_id: number,
    category_wise_schedule_id: number,
    login_id: number
  ): Observable<any> {
    return this.http.delete<any>(
      `${environment.deleteScheduleNewFeeDiscountCategory}?country_code=${country_code}&customer_id=${customer_id}&category_wise_schedule_id=${category_wise_schedule_id}&login_id=${login_id}`
    );
  }

  deleteScheduleFeeStudentWise(
    country_code: any,
    customer_id: number,
    student_wise_schedule_id: number,
    login_id: number
  ): Observable<any> {
    return this.http.delete<any>(
      `${environment.deleteScheduleFeeStudentWise}?country_code=${country_code}&customer_id=${customer_id}&student_wise_schedule_id=${student_wise_schedule_id}&login_id=${login_id}`
    );
  }
  //Get category name by using category

  getNameByCategory(
    country_code: string,
    customer_id: number,
    category_id: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getNameByCategory}?country_code=${country_code}&customer_id=${customer_id}&category_id=${category_id}`
    );
  }
  getCategoryNameByUserIDNew(
    country_code: string,
    customer_id: number,
    user_id: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getCategoryNameByUserIDNew}?country_code=${country_code}&customer_id=${customer_id}&user_id=${user_id}`
    );
  }

  getNameBySingleCategory(
    country_code: string,
    customer_id: number,
    category_id: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getNameBySingleCategory}?country_code=${country_code}&customer_id=${customer_id}&category_id=${category_id}`
    );
  }
  //Get category name by using user id

  getNameByUserID(
    country_code: string,
    customer_id: number,
    user_id: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getNameByUserID}?country_code=${country_code}&customer_id=${customer_id}&user_id=${user_id}`
    );
  }
  //insert schedule new schedule fee discount category
  insertScheduleNewFeeDiscountStudentWiseDiscount(
    country_code: string,
    customer_id: number,

    user_id: number,
    scheduled_billing_date: string,
    due_for_payment_days: number,
    academic_year: string,
    fee_category_id: number,

    fee_amount: string,

    fee_amount_currency_short_form: string,

    discount_category_id: any,
    discount_amount: any,

    discount_amount_currency_short_form: any,
    narration: string,
    details: any
  ) {
    return this.http.post<any>(
      `${environment.insertScheduleNewFeeDiscountStudentWiseDiscount}?country_code=${country_code}&customer_id=${customer_id}&user_id=${user_id}&scheduled_billing_date=${scheduled_billing_date}&due_for_payment_days=${due_for_payment_days}&academic_year=${academic_year}&fee_category_id=${fee_category_id}&fee_amount=${fee_amount}&fee_amount_currency_short_form=${fee_amount_currency_short_form}&discount_category_id=${discount_category_id}&discount_amount=${discount_amount}&discount_amount_currency_short_form=${discount_amount_currency_short_form}&narration=${narration}`,
      details
    );
  }

  //Get schedule new schedule fee discount category table

  getStudentWiseTable(
    country_code: string,
    customer_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getStudentWiseTable}?country_code=${country_code}&customer_id=${customer_id}`
    );
  }

  //get fee category names
  getFeeDiscountCategoryName(
    country_code: string,
    customer_id: number,
    discount_category_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getFeeDiscountCategoryName}?country_code=${country_code}&customer_id=${customer_id}&discount_category_id=${discount_category_id}`
    );
  }

  //get fee discount category names
  getFeeCategoryName(
    country_code: string,
    customer_id: number,
    fee_category_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getFeeCategoryName}?country_code=${country_code}&customer_id=${customer_id}&fee_category_id=${fee_category_id}`
    );
  }

  //Fee Collection Notifications - next chapter

  getDateCategoryWiseTable(
    country_code: string,
    customer_id: number,
    user_category_id: string
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getDateCategoryWiseTable}?country_code=${country_code}&customer_id=${customer_id}&user_category_id=${user_category_id}`
    );
  }
  getDateStudentWiseTable(
    country_code: string,
    customer_id: number,
    user_id: string
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getDateStudentWiseTable}?country_code=${country_code}&customer_id=${customer_id}&user_id=${user_id}`
    );
  }
  //insert due date category wise
  insertDueDateCategoryWise(
    country_code: string,
    customer_id: number,
    category_wise_schedule_id: number,
    details: any
  ) {
    return this.http.post<any>(
      `${environment.insertDueDateCategoryWise}?country_code=${country_code}&customer_id=${customer_id}&category_wise_schedule_id=${category_wise_schedule_id}`,
      details
    );
  }

  //update schedule Edit fee Cusom student wise
  updateDueEditCategoryWise(
    country_code: string,
    customer_id: number,
    category_wise_schedule_id: number,
    login_id: number,
    details: any
  ): Observable<any> {
    return this.http.put<any>(
      `${environment.updateDueEditCategoryWise}?country_code=${country_code}&customer_id=${customer_id}&category_wise_schedule_id=${category_wise_schedule_id}&login_id=${login_id}`,
      details
    );
  }

  //App Administration - Payment Configuration

  getPermitAccessTable(
    country_code: string,
    customer_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getPermitAccessTable}?country_code=${country_code}&customer_id=${customer_id}`
    );
  }
  insertPermitAccess(
    country_code: string,
    customer_id: number,
    name: any
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.insertPermitAccess}?country_code=${country_code}&customer_id=${customer_id}`,
      name
    );
  }

  getDenyAccessTable(
    country_code: string,
    customer_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getDenyAccessTable}?country_code=${country_code}&customer_id=${customer_id}`
    );
  }

  //delete schedule new schedule fee discount category
  deleteDenyAccess(
    country_code: any,
    customer_id: number,
    login_id: any
  ): Observable<any> {
    return this.http.delete<any>(
      `${environment.deleteDenyAccess}?country_code=${country_code}&customer_id=${customer_id}&login_id=${login_id}`
    );
  }

  // Fee Payment Receipt - Format / Configuration
  insertColors(
    country_code: string,
    customer_id: number,
    login_id: number,
    details: any
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.insertColors}?country_code=${country_code}&customer_id=${customer_id}&login_id=${login_id}`,
      details
    );
  }

  //Bus Fee Management
  getRoutes(
    country_code: string,
    customer_id: number,
    user_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getRoutes}?country_code=${country_code}&customer_id=${customer_id}&user_id=${user_id}`
    );
  }
  insertBusFee(
    country_code: string,
    customer_id: number,
    route_id: number,
    fee_amount_currency_short_form: string,
    details: any
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.insertBusFee}?country_code=${country_code}&customer_id=${customer_id}&route_id=${route_id}&fee_amount_currency_short_form=${fee_amount_currency_short_form}`,
      details
    );
  }

  getEffectiveDates(
    country_code: string,
    customer_id: number,
    route_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getEffectiveDates}?country_code=${country_code}&customer_id=${customer_id}&route_id=${route_id}`
    );
  }

  getRoutesHistory(
    country_code: string,
    customer_id: number,
    user_id: number,
    route_id: number,
    effective_from_datetime: string
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getRoutesHistory}?country_code=${country_code}&customer_id=${customer_id}&user_id=${user_id}&route_id=${route_id}&effective_from_datetime=${effective_from_datetime}`
    );
  }
}
