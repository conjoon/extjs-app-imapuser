# app-cn_imapuser  [![Build Status](https://travis-ci.org/conjoon/app-cn_imapuser.svg?branch=master)](https://travis-ci.org/conjoon/app-cn_imapuser)

conjoon application module for providing user authentication against an imap server. 

## Naming
The following naming conventions apply:

#### Namespace
`conjoon.cn_imapuser.*`
#### Package name
`app-cn_imapuser`
#### Shorthand to be used with providing aliases
`cn_imapuser`

**Example:**
Class `conjoon.cn_imapuser.view.authentication.AuthWindow` has the alias `widget.cn_imapuser-authwindow`

# Usage
## Requirements
 * This package requires the [lib-cn_user](https://github.com/coon-js/lib-cn_user) package of the [coon.js](https://github.com/coon-js) project.
 * This package requires the [theme-cn_default](https://github.com/conjoon/theme-cn_default) package of the [conjoon](https://github.com/conjoon) project.

When using this package without a backend implementation, make sure your app uses the [dev-cn_imapusersim](https://github.com/conjoon/dev-cn_imapusersim) package  of the [conjoon](https://github.com/conjoon) project.

# Available API Implementations
A simplistic RESTful PHP backend that can be used with single sign-ons to existing IMAP Servers can be found at [php-cn_imapuser](https://github.com/conjoon/php-cn_imapuser).

## Required API
Any developer striving for an own backend implementation should make sure to provide the following services:

 * `cn_imapuser/auth` | **POST** 
 * **Parameters:**  
      * `{username}` (required): The username of the IMAP Account for which the user should be authenticated;
      * `{password}` (required): The password of this user;
    * Authenticates a user with the specified `username` and `password`. If successful, `app-cn_imapuser` will make sure that the current user is a valid user for the lifetime of the application.   
    * Success Status / Response: Status 200 `{success :  true, data : {...}]` The response should return the user's data
    * Failure Status / Response: Status 401 `{success : false}`

