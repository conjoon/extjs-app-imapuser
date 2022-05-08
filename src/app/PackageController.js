/**
 * conjoon
 * extjs-app-imapuser
 * Copyright (C) 2017-2022 Thorsten Suckow-Homberg https://github.com/conjoon/extjs-app-imapuser
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
Ext.define("conjoon.cn_imapuser.app.PackageController", {

    extend: "coon.user.app.PackageController",

    requires: [
        // @define
        "l8",
        "coon.user.Manager",
        "conjoon.cn_imapuser.UserProvider",
        // @extjs 7.4.0.42 seems to explicitely require Ext.util.Cookies
        "Ext.util.Cookies",
        "coon.core.ServiceProvider"
    ],

    /**
     * UserImageService as returned by the ServiceProvider for showing the
     * UserImage in the toolbar
     * @type {coon.core.service.UserImageService} userImageService
     * @private
     */

    control: {

        "cn_navport-tbar #cn_imapuser-logoutBtn": {
            click: "onLogoutButtonClick"
        }
    },


    /**
     * @inheritdoc
     */
    init: function (app) {

        const
            me = this,
            baseAddress = app.getPackageConfig(me, "service.rest-imapuser.base");

        me.userImageService = coon.core.ServiceProvider.get("coon.core.service.UserImageService");

        coon.user.Manager.setUserProvider(
            Ext.create("conjoon.cn_imapuser.UserProvider", {
                // fails to optimize when written as  Shorthand property name (ES2015): {baseAddress}
                baseAddress: baseAddress ? l8.unify(baseAddress, "/", "://") : undefined
            })
        );

    },


    /**
     * Shows the {@link coon.user.view.authentication.AuthWindow} if no
     * user is available via {@link coon.user.Manager#getUser}, and returns
     * false. Returns true otherwise.
     *
     *@inheritdoc
     */
    preLaunchHook: function (app) {

        const me = this,
            cookies = me.getCookies(),
            username = cookies.username,
            password = cookies.password;

        if (coon.user.Manager.getUser()) {
            return true;
        }

        let title = app.getPackageConfig(me, "title");
        title && Ext.fireEvent("conjoon.application.TitleAvailable", me, title);

        if (username && password) {
            coon.user.Manager.loadUser({
                params: {
                    userid: username,
                    password: password
                },
                success: me.onUserLoadSuccess,
                failure: me.onUserLoadFailure,
                scope: me
            });

            return false;
        }
        if (!coon.user.Manager.getUser()) {
            this.createAuthWindow();
            return false;
        }


        return true;
    },


    /**
     * @inheritdoc
     */
    postLaunchHook: function () {

        const me = this,
            permaNav = me.callParent(arguments),
            user = coon.user.Manager.getUser();

        permaNav.permaNav.items[0] = {
            xtype: "button",
            maxWidth: 200,
            text: user.get("username"),
            menu: {
                listeners: {
                    beforeshow: function (menu) {
                        menu.setWidth(menu.up("button").getWidth());
                    }
                },
                items: [{
                /**
                 * @i18n
                 */
                    text: "Logout",
                    itemId: "cn_imapuser-logoutBtn"
                }]}
        };

        permaNav.permaNav.items[1] = {
            xtype: "cn_user-toolbaruserimageitem",
            src: me.userImageService.getImageSrc(user.get("username"))
        };
        return permaNav;
    },

    /**
     * @inheritdoc
     */
    userAvailable: function (userModel) {

        const me = this;

        if (me.authWindow) {
            if (me.authWindow.down("#cn_imapuser_rememberMe").getValue()) {
                this.setCookies(userModel.get("username"), userModel.get("password"));
            } else {
                this.setCookies(null);
            }
        }

        return me.callParent(arguments);
    },


    /**
     * @inheritdoc
     */
    userWasNotAuthorized: function () {

        const me = this,
            authWindow = me.authWindow;

        if (!authWindow) {
            return;
        }

        authWindow.down("cn_user-authform").showAuthorizationFailed(true);
    },


    privates: {

        /**
         * @inheritdoc
         */
        onUserLoadFailure: function (options) {
            const me = this,
                authWindow = me.authWindow;

            this.setCookies(null);

            if (!authWindow) {
                this.createAuthWindow();
            }

            return me.callParent(arguments);
        },


        /**
         * Callback for logout button of the user menu in the permanav.
         *
         * @param btn
         */
        onLogoutButtonClick: function (btn) {

            this.setCookies(null);

            window.location.reload();
        },


        /**
         * Sets the cookies for an user, or clears available cookies based on the
         * specified arguments.
         * Available cookies are cleared if this method is called with null as its
         * only argument.
         * If cookies are created, the default lifetime is 24 hrs for these cookies.
         *
         * @example
         *   this.setCookies(null) // clears cookies
         *   this.setCookies("foo", "bar"); // saves user "foo" with password "bar" in its
         *   cookies.
         *
         * @param {String} username
         * @param {String} password
         *
         * @return null if cookies have been cleard, otherwise an object containing
         * username/password key-value pairs
         */
        setCookies: function (username, password) {

            if (arguments.length === 1 && username === null) {
                Ext.util.Cookies.clear("cn_imapuser-username", "./");
                Ext.util.Cookies.clear("cn_imapuser-password", "./");

                return null;
            }

            let expires = new Date(Date.now() + ((60 * 60 * 24) * 1000));

            Ext.util.Cookies.set("cn_imapuser-username", username, expires,  "./");
            Ext.util.Cookies.set("cn_imapuser-password", password, expires,  "./");

            return {
                username: username,
                password: password
            };
        },

        /**
         * Returns the values of the cookies for this user's authentication in an object
         * keyed with username/password.
         *
         * @return {{password: *, username: *}}
         */
        getCookies: function () {

            return {
                username: Ext.util.Cookies.get("cn_imapuser-username"),
                password: Ext.util.Cookies.get("cn_imapuser-password")
            };
        }

    }


});
