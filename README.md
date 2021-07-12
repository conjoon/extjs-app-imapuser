# @conjoon/extjs-app-imapuser
conjoon application module for providing user authentication against an imap server. 

## Installation
```
npm install --save-dev @conjoon/extjs-app-imapuser
```

## Post-Install
[@coon-js/extjs-link](https://npmjs.org/coon-js/extjs-link) will start once the package was installed and guide you
through the process of creating symlinks to an existing ExtJS sdk installation.
This is only required if you want to run the tests (`./tests`), as [Siesta](https//npmjs.org/siesta-lite) relies on
an existing ExtJS installation.

## Usage
When using this package without a backend implementation, make sure your app uses the [extjs-app-imapusersim](https://github.com/conjoon/extjs-app-imapusersim) package  of the [conjoon](https://github.com/conjoon) project.

### Available API Implementations
A simplistic RESTful PHP backend that can be used with single sign-ons to existing IMAP Servers can be found at [php-cn_imapuser](https://github.com/conjoon/php-cn_imapuser).

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
