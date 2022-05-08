/**
 * conjoon
 * extjs-app-imapuser
 * Copyright (C) 2022 Thorsten Suckow-Homberg https://github.com/conjoon/extjs-app-imapuser
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

    t.diag("feat: title of app should be set once configuration is available conjoon/conjoon#7");


    // +----------------------------------------------------------------------------
    // |                    =~. Unit Tests .~=
    // +----------------------------------------------------------------------------


    t.it("preLaunchHook()", t => {

        let FAKE_TITLE = "PACKAGE_TITLE";

        const
            ctrl = Ext.create("conjoon.cn_imapuser.app.PackageController"),
            fakeCookies = {},
            fakeApp = {getPackageConfig: function (){return FAKE_TITLE;}},
            spy = t.spyOn(fakeApp, "getPackageConfig"),
            fireSpy = t.spyOn(Ext, "fireEvent");

        ctrl.getCookies = () => fakeCookies;
        ctrl.createAuthWindow = () => {};
        
        ctrl.preLaunchHook(fakeApp);
        
        t.isDeeplyStrict(spy.calls.mostRecent().args, [ctrl, "title"]);
        t.isDeeplyStrict(fireSpy.calls.mostRecent().args, ["conjoon.application.TitleAvailable", ctrl, FAKE_TITLE]);

        FAKE_TITLE = undefined;
        ctrl.preLaunchHook(fakeApp);
        t.expect(fireSpy.calls.count()).toBe(1);

        FAKE_TITLE = "truthy";
        ctrl.preLaunchHook(fakeApp);
        t.expect(fireSpy.calls.count()).toBe(2);

        coon.user.Manager.getUser = () => ({});
        ctrl.preLaunchHook(fakeApp);
        t.expect(fireSpy.calls.count()).toBe(2);

        [spy, fireSpy].map(spy => spy.remove());

    });


});
