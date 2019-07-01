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

describe('conjoon.cn_imapuser.UserProviderTest', function(t) {

t.requireOk('conjoon.dev.cn_imapusersim.data.imapuser.PackageSim', function() {

    t.it("constructor", function(t) {

        const provider = Ext.create('conjoon.cn_imapuser.UserProvider');

        t.isInstanceOf(provider, 'coon.user.DefaultUserProvider');

    });


    t.it("loadUser() - exception", function(t) {

        const provider = Ext.create('conjoon.cn_imapuser.UserProvider');

        let exc, e;

        try {
            provider.loadUser();
        } catch(e) {exc = e;}
        t.expect(exc).toBeDefined();
        t.expect(exc.msg).toContain("must be an object with the properties");
        exc = undefined;

        try {
            provider.loadUser({});
        } catch(e) {exc = e;}
        t.expect(exc).toBeDefined();
        t.expect(exc.msg).toContain("must be an object with the properties");
        exc = undefined;


        try {
            provider.loadUser({userid : 'dsd'});
        } catch(e) {exc = e;}
        t.expect(exc).toBeDefined();
        t.expect(exc.msg).toContain("must be an object with the properties");
        exc = undefined;

        try {
            provider.loadUser({password : 'dsd'});
        } catch(e) {exc = e;}
        t.expect(exc).toBeDefined();
        t.expect(exc.msg).toContain("must be an object with the properties");
        exc = undefined;
    });


    t.it("loadUser() - success", function(t) {

        const provider = Ext.create('conjoon.cn_imapuser.UserProvider');

        let CALLED = null;

        provider.onUserLoad = function() {
            CALLED = 1;
        };

        t.expect(CALLED).toBe(null);
        provider.loadUser({userid : 'test', password : 'test'})
        t.waitForMs(250, function() {
           t.expect(CALLED).toBe(1);
        });

    });


    t.it("loadUser() - failure", function(t) {

        const provider = Ext.create('conjoon.cn_imapuser.UserProvider');

        let CALLED = null, OPTIONS = {userid : 'TESTFAIL', password : 'test'};

        provider.onUserLoadFailure = function(prov, opt) {
            t.expect(opt).toBe(OPTIONS);
            CALLED = 1;
        };

        t.expect(CALLED).toBe(null);
        provider.loadUser(OPTIONS)
        t.waitForMs(250, function() {
            t.expect(CALLED).toBe(1);
        });

    });


    t.it("onUserLoad()", function(t) {

        const provider = Ext.create('conjoon.cn_imapuser.UserProvider');

        let CALLED = null;

        provider.isLoading = true;

        provider.on('cn_user-userload', function(prov, user) {

            t.isInstanceOf(user, 'coon.user.model.UserModel');
            t.expect(user.get('username')).toBe('A');
            t.expect(user.get('password')).toBe('B');

            t.expect(prov).toBe(provider);

            CALLED = 1;
        });

        provider.onUserLoad({responseText : Ext.encode({data:{username : 'A', password : 'B'}})});

        t.expect(CALLED).toBe(1);
        t.expect(provider.isLoading).toBe(false);
    });


    t.it("onUserLoadFailure()", function(t) {

        const provider = Ext.create('conjoon.cn_imapuser.UserProvider');

        let CALLED = null, RESP = {}, OPTIONS = {};

        provider.isLoading = true;

        provider.on('cn_user-userloadfailure', function(prov, opt) {

            t.expect(prov).toBe(provider);
            t.expect(opt).toBe(OPTIONS);

            CALLED = 1;
        });

        provider.onUserLoadFailure(RESP, OPTIONS);

        t.expect(CALLED).toBe(1);
        t.expect(provider.user).toBe(null);
        t.expect(provider.isLoading).toBe(false);
    });

});



});
