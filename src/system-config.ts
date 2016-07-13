/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  '@angular2-material': 'vendor/@angular2-material',
  'lodash': 'vendor/lodash',
  'ng2-material': 'vendor/ng2-material'
};

/** User packages configuration. */
const packages: any = {
  'rxjs': { main: 'Rx'},
  'lodash': { main: 'lodash'},
  'ng2-material': { main: 'index'}
};

// put the names of any of your Material components here
const materialPkgs: string[] = [
  'button',
  'checkbox',
  'core',
  'icon',
  'list',
  'sidenav'
];

materialPkgs.forEach((pkg) => {
  packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`};
});

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.

  // App specific barrels.
  'app',
  'app/shared',
  'app/header',
  'app/hm-admin/header',
  'app/hm-admin/content',
  'app/hm-admin/+home',
  'app/hm-admin/+list',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
