/**
 * conjoon
 * extjs-app-imapuser
 * Copyright (C) 2017-2021 Thorsten Suckow-Homberg https://github.com/conjoon/extjs-app-imapuser
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

describe("conjoon.cn_imapuser.app.PackageControllerTest", function (t) {


    t.it("constructor / config", function (t) {

        const ctrl = Ext.create("conjoon.cn_imapuser.app.PackageController");

        t.isInstanceOf(ctrl, "coon.user.app.PackageController");

        t.expect(ctrl.getControl()).toEqual({
            "cn_navport-tbar #cn_imapuser-logoutBtn": {
                click: "onLogoutButtonClick"
            }
        });

    });


    t.it("userWasNotAuthorized()", function (t) {

        const ctrl = Ext.create("conjoon.cn_imapuser.app.PackageController");

        let SHOW = null;

        ctrl.authWindow = {

            down: function () {
                return {
                    showAuthorizationFailed: function (v) {
                        SHOW = v;
                    }
                };
            }
        };

        ctrl.userWasNotAuthorized();
        t.expect(SHOW).toBe(true);

        SHOW = null;

        delete ctrl.authWindow;

        ctrl.userWasNotAuthorized();
        t.expect(SHOW).toBe(null);

    });


    t.it("init()", function (t) {

        const ctrl = Ext.create("conjoon.cn_imapuser.app.PackageController");

        t.expect(coon.user.Manager.getUserProvider() instanceof conjoon.cn_imapuser.UserProvider).toBe(false);

        ctrl.init();

        t.isInstanceOf(coon.user.Manager.getUserProvider(), "conjoon.cn_imapuser.UserProvider");

    });


    t.it("userAvailable()", function (t) {

        let COOKIES = {};
        const tmp = Ext.util.Cookies.set;
        const tmp2 = Ext.util.Cookies.clear;

        Ext.util.Cookies.clear = function () {
            COOKIES = {};
        };
        Ext.util.Cookies.set = function (prop, val) {
            COOKIES[prop] = val;
        };
        const ctrl = Ext.create("conjoon.cn_imapuser.app.PackageController");

        let ID;
        let REMEMBERME = true;
        ctrl.authWindow = {
            down: function (prop) {
                ID = prop;

                return {
                    getValue: function () {
                        return REMEMBERME;
                    }
                };
            }
        };

        ctrl.callParent = function (args) {};

        ctrl.userAvailable({get: function (prop) {return prop;}});

        t.expect(COOKIES).toEqual({"cn_imapuser-username": "username", "cn_imapuser-password": "password"});
        t.expect(ID).toBe("#cn_imapuser_rememberMe");

        REMEMBERME = false;
        ctrl.userAvailable({get: function (prop) {return prop;}});
        t.expect(COOKIES).toEqual({});

        Ext.util.Cookies.set = tmp;
        Ext.util.Cookies.clear = tmp2;
    });


    t.it("onUserLoadFailure()", function (t) {

        const ctrl = Ext.create("conjoon.cn_imapuser.app.PackageController");

        ctrl.authWindow = null;

        var CREATED = false;

        ctrl.createAuthWindow = function () {
            CREATED = true;
        };
        ctrl.callParent = function () {};
        var CLEARED = [];
        var tmp = Ext.util.Cookies.clear;
        Ext.util.Cookies.clear = function (cookieName) {
            CLEARED.push(cookieName);
        };

        ctrl.onUserLoadFailure();

        t.expect(CREATED).toBe(true);
        t.expect(CLEARED).toEqual([
            "cn_imapuser-username",
            "cn_imapuser-password"
        ]);

        Ext.util.Cookies.clear = tmp;
    });


    t.it("preLaunchHook()", function (t) {

        const ctrl = Ext.create("conjoon.cn_imapuser.app.PackageController");

        var tmp = Ext.util.Cookies.get;

        Ext.util.Cookies.get = function (prop) {
            return prop;
        };

        let USER = {};
        coon.user.Manager.getUser = function () {
            return USER;
        };

        t.expect(ctrl.preLaunchHook()).toBe(true);

        USER = null;
        let OPTIONS = {};
        coon.user.Manager.loadUser = function (options) {
            OPTIONS = options;
        };
        t.expect(ctrl.preLaunchHook()).toBe(false);
        t.expect(OPTIONS.params.userid).toBe("cn_imapuser-username");
        t.expect(OPTIONS.params.password).toBe("cn_imapuser-password");

        Ext.util.Cookies.get = function (prop) {
            return undefined;
        };

        let CREATED = false;
        ctrl.createAuthWindow = function () {
            CREATED = true;
        };
        t.expect(ctrl.preLaunchHook()).toBe(false);
        t.expect(CREATED).toBe(true);

        Ext.util.Cookies.get = tmp;
    });


    t.it("setCookies() / getCookies()", function (t) {

        let COOKIES = {};
        const tmp = Ext.util.Cookies.set;
        const tmp2 = Ext.util.Cookies.clear;

        Ext.util.Cookies.clear = function (name, path) {
            if (COOKIES[name] && COOKIES[name].path === path) {
                delete COOKIES[name];
            }
        };
        Ext.util.Cookies.set = function (prop, val, expires, path) {
            COOKIES[prop] = {value: val, expires: expires, path: path};
        };
        Ext.util.Cookies.get = function (prop) {
            return COOKIES[prop] ? COOKIES[prop].value : null;
        };
        const ctrl = Ext.create("conjoon.cn_imapuser.app.PackageController");

        t.expect(ctrl.setCookies("a", "b")).toEqual({
            username: "a",
            password: "b"
        });

        t.expect(ctrl.getCookies()).toEqual({
            username: "a",
            password: "b"
        });


        t.expect(COOKIES["cn_imapuser-username"].value).toBe("a");
        t.expect(COOKIES["cn_imapuser-username"].path).toBe("./");
        t.expect(COOKIES["cn_imapuser-username"].expires + "").toEqual((new Date(Date.now() + ((60 * 60 * 24) * 1000))) + "");

        t.expect(COOKIES["cn_imapuser-password"].value).toBe("b");
        t.expect(COOKIES["cn_imapuser-password"].path).toBe("./");
        t.expect(COOKIES["cn_imapuser-password"].expires + "").toEqual((new Date(Date.now() + ((60 * 60 * 24) * 1000))) + "");


        t.expect(ctrl.setCookies(null)).toBe(null);

        t.expect(COOKIES["cn_imapuser-username"]).toBeUndefined();
        t.expect(COOKIES["cn_imapuser-password"]).toBeUndefined();

        t.expect(ctrl.getCookies()).toEqual({
            username: null,
            password: null
        });


        Ext.util.Cookies.set = tmp;
        Ext.util.Cookies.clear = tmp2;
    });


    t.it("postLaunchHook()", function (t) {

        const ctrl = Ext.create("conjoon.cn_imapuser.app.PackageController");

        let USER = {get: function (){return "foobar";}};
        coon.user.Manager.getUser = function () {
            return USER;
        };


        let permaNav = ctrl.postLaunchHook();

        t.expect(permaNav.permaNav[0].xtype).toBe("button");
        t.expect(permaNav.permaNav[0].menu).toBeDefined();

    });


    t.it("onLogoutButtonClick()", function (t){

        const ctrl = Ext.create("conjoon.cn_imapuser.app.PackageController");

        let COOKIES = true;
        ctrl.setCookies = function (val) {
            COOKIES = val;
        };

        ctrl.onLogoutButtonClick();

        t.expect(COOKIES).toBe(null);

    });
   

});
