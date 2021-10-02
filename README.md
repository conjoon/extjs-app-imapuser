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

The url of this service can be configured in the configuration file for this package: a file named `extjs-app-imapuser.conf.json` in the  where this service can be found, you need t
Example:
```json
{
    "service": {
        "rest-imapuser": {
            "base" : "https://localhost/rest-imapuser/api/v1"
        }
    }
}
    
```

### Required API
Any developer striving for an own backend implementation should make sure to provide the following services:

* `cn_imapuser/auth` | **POST**
    * **Parameters:**
        * `{username}` (required): The username of the IMAP Account for which the user should be authenticated;
        * `{password}` (required): The password of this user;
    * Authenticates a user with the specified `username` and `password`. If successful, `extjs-app-imapuser` will make sure that the current user is a valid user for the lifetime of the application.
    * Success Status / Response: Status 200 `{success :  true, data : {...}]` The response should return the user's data
    * Failure Status / Response: Status 401 `{success : false}`


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
