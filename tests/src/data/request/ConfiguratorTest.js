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

    t.requireOk(
        "coon.user.Manager",
        "coon.user.Util", () => {


            t.it("configure()", t => {

                const configurator = Ext.create("conjoon.cn_imapuser.data.request.Configurator");


                t.isInstanceOf(configurator, "coon.core.data.request.Configurator");

                const managerSpy = t.spyOn(coon.user.Manager, "getUser").and.callFake(() => {
                    return Ext.create("coon.user.model.UserModel", {
                        "username": "username",
                        "password": "password"
                    });
                });

                const requestObj = {
                    headers: {
                        "foo": "bar"
                    }
                };

                const request = Ext.create("Ext.data.Request", {
                    headers: {
                        "foo": "bar"
                    }
                });

                const resObj = configurator.configure(requestObj);
                t.expect(resObj.headers.foo).toBe("bar");
                t.expect(resObj.headers.Authorization).toBe(
                    `Basic ${coon.user.Util.userToCredentials(
                        coon.user.Manager.getUser(), coon.user.Util.BASIC_AUTH
                    )}`
                );


                const res = configurator.configure(request);
                t.expect(res.getHeaders().foo).toBe("bar");
                t.expect(res.getHeaders().Authorization).toBe(
                    `Basic ${coon.user.Util.userToCredentials(
                        coon.user.Manager.getUser(), coon.user.Util.BASIC_AUTH
                    )}`
                );

                [managerSpy].map(spy => spy.remove());

            });

        });

});
