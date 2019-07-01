/**
 * conjoon
 * app-cn_imapuser
 * Copyright (C) 2019 Thorsten Suckow-Homberg https://github.com/conjoon/app-cn_imapuser
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Override to make sure this PackageController is recognized by an application if requested.
 * Additionally, this PackageController implements {coon.user.app.PackageController#userWasNotAuthorized}
 * to make sure any existing {coon.user.view.authentication.AuthForm#showAuthorizationFailed} is called.
 */
Ext.define('conjoon.cn_imapuser.app.PackageController', {

    extend : 'coon.user.app.PackageController',

    requires : [
        'coon.user.Manager',
        'conjoon.cn_imapuser.UserProvider'
    ],


    /**
     * @inheritdoc
     */
    init : function() {

        coon.user.Manager.setUserProvider(
            Ext.create('conjoon.cn_imapuser.UserProvider')
        );

    },


    /**
     * @inheritdoc
     */
    userWasNotAuthorized : function() {

        const me = this,
            authWindow = me.authWindow;

        if (!authWindow) {
            return;
        }

        authWindow.down('cn_user-authform').showAuthorizationFailed(true);


    }

});