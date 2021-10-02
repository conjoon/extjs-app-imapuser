# @conjoon/extjs-app-imapuser
conjoon application module for providing user authentication against an imap server. 

## Installation
```
npm install --save-dev @conjoon/extjs-app-imapuser
```

If you want to develop with this package, run the `build:dev`-script afterwards:
```bash
npm run build:dev
```
Testing environment will then be available via

```bash
npm test
```

## Usage
When using this package without a backend implementation, make sure your app uses the [extjs-app-imapusersim](https://github.com/conjoon/extjs-app-imapusersim) package  of the [conjoon](https://github.com/conjoon) project.

### Required Services
This package requires a service that complies with the REST API described in `rest-imapuser` which can be found 
in the [REST API description](https://github.com/conjoon/rest-api-descriptions) of the conjoon project.

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

## Dev
### Naming
The following naming conventions apply:

#### Namespace
`conjoon.cn_imapuser.*`
#### Package name
`extjs-app-imapuser`
#### Shorthand to be used with providing aliases
`cn_imapuser`

**Example:**
Class `conjoon.cn_imapuser.view.authentication.AuthWindow` has the alias `widget.cn_imapuser-authwindow`
