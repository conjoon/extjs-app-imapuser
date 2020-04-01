/**
 * conjoon
 * app-cn_imapuser
 *  Copyright (C) 2017 - 2020 Thorsten Suckow-Homberg https://github.com/conjoon/app-cn_imapuser
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

describe("conjoon.cn_imapuser.overrides.coon.user.view.authentication.AuthFormTest", function (t) {


    t.requireOk("conjoon.cn_imapuser.overrides.coon.user.view.authentication.AuthForm", function () {

        t.it("Should render AuthForm properly", function (t) {

            const authForm = Ext.create("coon.user.view.authentication.AuthForm", {
                renderTo : document.body
            });


            t.expect(authForm.down("#cn_imapuser_rememberMe")).toBeTruthy();


        });


    });

});