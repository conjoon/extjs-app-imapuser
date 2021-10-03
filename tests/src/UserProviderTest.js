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

StartTest(t => {

    t.requireOk("conjoon.dev.cn_imapusersim.app.PackageController", () => {

        let simctrl;

        t.beforeEach(() =>  {
            simctrl = Ext.create("conjoon.dev.cn_imapusersim.app.PackageController");
            simctrl.init({
                getPackageConfig: () => ({
                    url: "rest-imapuser/auth",
                    enabled: true,
                    delay: 1
                })
            });
        });

        t.afterEach(() =>  {
            if (!simctrl) {
                return;
            }

            simctrl.destroy();
            simctrl = null;
        });

        t.it("constructor", (t) => {

            const provider = Ext.create("conjoon.cn_imapuser.UserProvider");

            t.isInstanceOf(provider, "coon.user.DefaultUserProvider");

        });


        t.it("loadUser() - exception", (t) => {

            const provider = Ext.create("conjoon.cn_imapuser.UserProvider");

            let exc;

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
                provider.loadUser({userid: "dsd"});
            } catch(e) {exc = e;}
            t.expect(exc).toBeDefined();
            t.expect(exc.msg).toContain("must be an object with the properties");
            exc = undefined;

            try {
                provider.loadUser({password: "dsd"});
            } catch(e) {exc = e;}
            t.expect(exc).toBeDefined();
            t.expect(exc.msg).toContain("must be an object with the properties");
            exc = undefined;
        });


        t.it("loadUser() - no baseAddress", (t) => {

            let spy = t.spyOn(Ext.Ajax, "request").and.callFake(() => {});
            const provider = Ext.create("conjoon.cn_imapuser.UserProvider");

            t.expect(provider.baseAddress).toBeUndefined();
            provider.loadUser({userid: "test", password: "test"});
            t.expect(spy.calls.all()[0].args[0].url).toBe("./rest-imapuser/auth");

            spy.remove();
        });


        t.it("loadUser() - baseAddress", (t) => {

            let spy = t.spyOn(Ext.Ajax, "request").and.callFake(() => {}),
                baseAddress = "https://localhost:8080/rest-imapuser/v1//";

            const provider = Ext.create("conjoon.cn_imapuser.UserProvider", {baseAddress});

            t.expect(provider.baseAddress).toBe(baseAddress);
            provider.loadUser({userid: "test", password: "test"});
            t.expect(spy.calls.all()[0].args[0].url).toBe(`${baseAddress}/auth`);

            spy.remove();
        });


        t.it("loadUser() - success", (t) => {

            const provider = Ext.create("conjoon.cn_imapuser.UserProvider");

            let CALLED = null;

            provider.onUserLoad = function () {
                CALLED = 1;
            };

            t.expect(CALLED).toBe(null);
            provider.loadUser({userid: "test", password: "test"});
            t.waitForMs(t.parent.TIMEOUT, () => {
                t.expect(CALLED).toBe(1);
            });

        });


        t.it("loadUser() - failure", (t) => {

            const provider = Ext.create("conjoon.cn_imapuser.UserProvider");

            let CALLED = null, OPTIONS = {userid: "TESTFAIL", password: "test"};

            provider.onUserLoadFailure = function (prov, opt) {
                t.expect(opt).toBe(OPTIONS);
                CALLED = 1;
            };

            t.expect(CALLED).toBe(null);
            provider.loadUser(OPTIONS);
            t.waitForMs(t.parent.TIMEOUT, () => {
                t.expect(CALLED).toBe(1);
            });

        });


        t.it("onUserLoad()", (t) => {

            const provider = Ext.create("conjoon.cn_imapuser.UserProvider");

            let CALLED = null;

            provider.isLoading = true;

            provider.on("cn_user-userload", function (prov, user) {

                t.isInstanceOf(user, "coon.user.model.UserModel");
                t.expect(user.get("username")).toBe("A");
                t.expect(user.get("password")).toBe("B");

                t.expect(prov).toBe(provider);

                CALLED = 1;
            });

            provider.onUserLoad({responseText: Ext.encode({data: {username: "A", password: "B"}})});

            t.expect(CALLED).toBe(1);
            t.expect(provider.isLoading).toBe(false);
        });


        t.it("onUserLoadFailure()", (t) => {

            const provider = Ext.create("conjoon.cn_imapuser.UserProvider");

            let CALLED = null, RESP = {}, OPTIONS = {};

            provider.isLoading = true;

            provider.on("cn_user-userloadfailure", function (prov, opt) {

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
