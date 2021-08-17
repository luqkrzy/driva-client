// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  studentsUrl: 'http://localhost:8080/api/students',
  accountUrl: 'http://localhost:8080/api/account',
  userUrl: 'http://localhost:8080/api/account',
  productTypeUrl: 'http://localhost:8080/api/product-type',
  lessonsUrl: 'http://localhost:8080/api/lessons',
  instructorUrl: 'http://localhost:8080/api/instructors',
  productUrl: 'http://localhost:8080/api/products'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
