/**
 * coon.js
 * lib-cn_user
 * Copyright (C) 2019 Thorsten Suckow-Homberg https://github.com/coon-js/lib-cn_user
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
 * UserProvider for app-cn_imapuser package.
 *
 * Authentication will use the url './cn_imapuser/auth' and POST a "username" and
 * a "password" property.
 *
 */
Ext.define('conjoon.cn_imapuser.UserProvider', {

    extend : 'coon.user.DefaultUserProvider',

    requires : [
        'coon.user.model.UserModel'
    ],


    /**
     * @inheritdoc
     *
     * @param {Object}  options
     * @param {Boolean} options.forceFail true to trigger the {@link #cn_user-userloadfailure}-event
     *
     *
     * @throws if options is not an object or if userid/password are missing in the object
     * as properties
     */
    loadUser : function(options) {

        const me = this;

        if (!Ext.isObject(options) || !options.hasOwnProperty('userid') || !options.hasOwnProperty('password')) {
            Ext.raise({
                msg : "\"options\" must be an object with the properties \"userid\" and \"password\" defined",
                options : options
            });
        }

        me.isLoading = true;

        Ext.Ajax.request({
            url : './cn_imapuser/auth',
            params : {
                username : options.userid,
                password : options.password
            },
            method : 'POST',
            success : me.onUserLoad,
            failure : function(response) {
                me.onUserLoadFailure(response, options);
            },
            scope : me
        });
    },


    /**
     * Callback for a successful attempt to load the user from the backend.
     *
     * @param {Object} response
     */
    onUserLoad : function(response) {

        const me = this,
              data = Ext.decode(response.responseText);

        me.user = Ext.create('coon.user.model.UserModel', data.data);

        me.fireEvent('cn_user-userload', me, me.user);
        me.isLoading = false;
    },


    /**
     * Callback for a failed attempt to load the user from the backend.
     *
     * @param {Object} response
     */
    onUserLoadFailure : function(response, options) {

        const me = this;

        me.user = null;
        me.fireEvent('cn_user-userloadfailure', me, options);
        me.isLoading = false;

    }
});
