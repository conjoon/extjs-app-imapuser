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

describe('conjoon.cn_imapuser.app.PackageControllerTest', function(t) {


    t.it("constructor", function(t) {

        const ctrl = Ext.create('conjoon.cn_imapuser.app.PackageController');

        t.isInstanceOf(ctrl, 'coon.user.app.PackageController');

    });


    t.it("userWasNotAuthorized()", function(t) {

        const ctrl = Ext.create('conjoon.cn_imapuser.app.PackageController');

        let SHOW = null;

        ctrl.authWindow = {

            down : function() {
                return {
                    showAuthorizationFailed : function(v) {
                        SHOW = v;
                    }
                }
            }
        };

        ctrl.userWasNotAuthorized();
        t.expect(SHOW).toBe(true);

        SHOW = null;

        delete ctrl.authWindow;

        ctrl.userWasNotAuthorized();
        t.expect(SHOW).toBe(null);

    });


    t.it("init()", function(t) {

        const ctrl = Ext.create('conjoon.cn_imapuser.app.PackageController');

        t.expect(coon.user.Manager.getUserProvider() instanceof conjoon.cn_imapuser.UserProvider).toBe(false);

        ctrl.init();

        t.isInstanceOf(coon.user.Manager.getUserProvider(), 'conjoon.cn_imapuser.UserProvider');

    });

});
