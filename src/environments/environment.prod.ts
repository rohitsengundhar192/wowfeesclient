const baseURL_2 = 'https://cephapi.getster.tech/api/';
const baseURL = 'https://u60api.getwow.education/api/';
const cephProd = 'https://u5api.getwow.education/api/';

export const environment = {
  production: true,
  baseURL: '',

  //Fee Discount Category

  getFeeCategoryTable:
    baseURL +
    'fee-management-with-tally/fee-discount-category/get-fee-category-table',
  getDiscountCategoryTable:
    baseURL +
    'fee-management-with-tally/fee-discount-category/get-discount-category-table',
  insertFeeCategory:
    baseURL +
    'fee-management-with-tally/fee-discount-category/insert-fee-category',
  updateFeeCategory:
    baseURL +
    'fee-management-with-tally/fee-discount-category/update-fee-category',

  getDiscountCategoryStuTable:
    baseURL +
    'fee-management-with-tally/fee-discount-category/get-discount-category-stu-table',
  insertDiscoutCategory:
    baseURL +
    'fee-management-with-tally/fee-discount-category/insert-discount-category',
  updateDiscountCategory:
    baseURL +
    'fee-management-with-tally/fee-discount-category/update-discount-category',

  //schedule fee discount to students
  get_category_access:
    baseURL +
    'fee-management-with-tally/schedule-fee-discount-to-students/get-access-category',
  get_category:
    baseURL +
    'fee-management-with-tally/schedule-fee-discount-to-students/get-all-categories',
  getacademicyear:
    baseURL +
    'fee-management-with-tally/schedule-fee-discount-to-students/get-academic-year',
  insertScheduleNewFeeDiscountCategory:
    baseURL +
    'fee-management-with-tally/schedule-fee-discount-to-students/insert-schedule-new-category-fee-discount',
  getScheduleNewFeeDiscountCategoryTable:
    baseURL +
    'fee-management-with-tally/schedule-fee-discount-to-students/get-insert-schedule-new-category-fee-discount-table',
  updateScheduleNewFeeDiscountCategory:
    baseURL +
    'fee-management-with-tally/schedule-fee-discount-to-students/update-schedule-new-category-fee-discount-table',
  updateScheduleEditFeeCustomStudentWise:
    baseURL +
    'fee-management-with-tally/schedule-fee-discount-to-students/update-schedule-edit-fee-custom-studentwise',
  deleteScheduleNewFeeDiscountCategory:
    baseURL +
    'fee-management-with-tally/schedule-fee-discount-to-students/delete-schedule-new-category-fee-discount-table',
  deleteScheduleFeeStudentWise:
    baseURL +
    'fee-management-with-tally/schedule-fee-discount-to-students/delete-schedule-Fee-studentwise-edit',
  getNameByCategory:
    baseURL +
    'fee-management-with-tally/schedule-fee-discount-to-students/get-category-name-by-category',
  getNameByUserID:
    baseURL +
    'fee-management-with-tally/schedule-fee-discount-to-students/get-category-name-by-user-id',
  insertScheduleNewFeeDiscountStudentWiseDiscount:
    baseURL +
    'fee-management-with-tally/schedule-fee-discount-to-students/insert-schedule-new-discount-student-wise',
  getStudentWiseTable:
    baseURL +
    'fee-management-with-tally/schedule-fee-discount-to-students/get-student-wise-table',
  getFeeDiscountCategoryName:
    baseURL +
    'fee-management-with-tally/schedule-fee-discount-to-students/get-fee-discount-category-name',
  getFeeCategoryName:
    baseURL +
    'fee-management-with-tally/schedule-fee-discount-to-students/get-fee-category-name',

  //Fee Collection Notifications
  getDateCategoryWiseTable:
    baseURL +
    'fee-management-with-tally/fee-collection-balance-remainder/get-due-date-category-wise-table',
  insertDueDateCategoryWise:
    baseURL +
    'fee-management-with-tally/fee-collection-balance-remainder/insert-due-date-category-wise',
  updateDueEditCategoryWise:
    baseURL +
    'fee-management-with-tally/fee-collection-balance-remainder/update-due-edit-category-wise',

  //App Administration - Payment Configuration
  getPermitAccessTable:
    baseURL +
    'fee-management-with-tally/app-administration/get-permit-access-table',
  insertPermitAccess:
    baseURL +
    'fee-management-with-tally/app-administration/insert-permit-access',
  getDenyAccessTable:
    baseURL +
    'fee-management-with-tally/app-administration/get-deny-access-table',
  deleteDenyAccess:
    baseURL + 'fee-management-with-tally/app-administration/delete-deny-access',

  // Fee Payment Receipt - Format / Configuration
  insertColors:
    baseURL + 'fee-management-with-tally/fee-payment-receipt/insert-colors',

  //bus Fee Management

  getRoutes:
    baseURL + 'fee-management-with-tally/bus-fee-management/get-routes',
  insertBusFee:
    baseURL + 'fee-management-with-tally/bus-fee-management/insert-bus-fee',
  getEffectiveDates:
    baseURL +
    'fee-management-with-tally/bus-fee-management/get-effective-dates',
  getRoutesHistory:
    baseURL + 'fee-management-with-tally/bus-fee-management/get-routes-history',

  // ------------------------------- CEPH Storage -----------------
  create_file: cephProd + 'files-master/file-upload-throw-other-customer-apps',
  update_file: baseURL_2 + 'storage-for-customers/update-file',

  get_file: baseURL_2 + 'storage-for-customers/get-file',
  get_file_multiple_files_based_on_key:
    baseURL_2 + 'storage-for-customers/get-file-multiple-files-based-on-key',
  delete_file_ceph: baseURL_2 + 'storage-for-customers/delete-file',

  ceph_URL: 'https://cephapi.getwow.biz/api/storage/',
  get_file_manage: baseURL_2 + 'storage-for-education-management/get-file',
  get_file_multiple_files_based_on_key_manage:
    baseURL_2 +
    'storage-for-education-management/get-file-multiple-files-based-on-key',

  // --------------------------Wallet -------------------------
  // wow_wallet_pop_up: 'https://p28.getwow.education',
  // get_wallet_pop_up: 'https://p27.getwow.education',

  wow_wallet_pop_up: 'https://p50.getwow.community',
  get_wallet_pop_up: 'https://p50.getwow.community',
};
