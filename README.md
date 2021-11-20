# @conjoon/extjs-app-imapuser ![MIT](https://img.shields.io/npm/l/@conjoon/extjs-app-imapuser) [![npm version](https://badge.fury.io/js/@conjoon%2Fextjs-app-imapuser.svg)](https://badge.fury.io/js/@conjoon%2Fextjs-app-imapuser)

conjoon application module for providing user authentication against an imap server. 

## Installation
```bash
$ npm install --save-dev @conjoon/extjs-app-imapuser
```

If you want to develop with this package, run the `build:dev`-script afterwards:
```bash
$ npm run build:dev
```
Testing environment will then be available via

```bash
$ npm test
```

For using the package as an external dependency in an application, use
```bash
$ npm install --save-prod @conjoon/extjs-app-imapuser
```
In your `app.json`, add this package as a requirement, and make sure your ExtJS `workspace.json`
is properly configured to look up local repositories in the `node_modules`-directory.

Example (`workspace.json`) :
```json 
{
  "packages": {
    "dir": "${workspace.dir}/node_modules/@l8js,${workspace.dir}/node_modules/@conjoon,${workspace.dir}/node_modules/@coon-js,${workspace.dir}/packages/local,${workspace.dir}/packages,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name},${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-treegrid,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-base,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-ios,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-material,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-aria,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-neutral,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-classic,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-gray,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-crisp,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-crisp-touch,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-neptune,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-neptune-touch,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-triton,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-graphite,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-material,${workspace.dir}/node_modules/@sencha/ext-calendar,${workspace.dir}/node_modules/@sencha/ext-charts,${workspace.dir}/node_modules/@sencha/ext-d3,${workspace.dir}/node_modules/@sencha/ext-exporter,${workspace.dir}/node_modules/@sencha/ext-pivot,${workspace.dir}/node_modules/@sencha/ext-pivot-d3,${workspace.dir}/node_modules/@sencha/ext-ux,${workspace.dir}/node_modules/@sencha/ext-font-ios",
    "extract": "${workspace.dir}/packages/remote"
  }
}
```

## Configuration options

### Rest API
- `service.rest-imapuser.base` - the base url to the [service](#required_services) providing endpoints for the [rest-imapuser](https://github.com/conjoon/rest-api-description)-API


## Usage
When using this package without a backend implementation, make sure your app uses the [extjs-app-imapusersim](https://github.com/conjoon/extjs-app-imapusersim) package  of the [conjoon](https://github.com/conjoon) project.

### Required Services <a name="required_services"></a>
This package requires a service that complies with the REST API described in `rest-imapuser` which can be found 
in the [REST API description](https://github.com/conjoon/rest-api-description) of the **conjoon**-project.

The url of this service can be configured in the configuration file for this package.

```json
{
    "service": {
        "rest-imapuser": {
            "base" : "https://localhost/rest-imapuser/api/v1"
        }
    }
} 
```
Please refer to the documentation of [extjs-lib-core](https://github.com/coon-js/extjs-lib-core) on how to 
create package-specific configurations.
