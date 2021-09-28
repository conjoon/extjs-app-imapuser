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

describe("conjoon.cn_imapuser.overrides.conjoon.cn_mail.data.mail.BaseSchemaTest", function (t) {

    const getModels= function () {

        return [
            "conjoon.cn_mail.model.mail.account.MailAccount",
            "conjoon.cn_mail.model.mail.folder.MailFolder",
            "conjoon.cn_mail.model.mail.message.DraftAttachment",
            "conjoon.cn_mail.model.mail.message.ItemAttachment",
            "conjoon.cn_mail.model.mail.message.MessageBody",
            "conjoon.cn_mail.model.mail.message.MessageDraft",
            "conjoon.cn_mail.model.mail.message.MessageItem"
        ];
    };

    t.requireOk("coon.user.Manager", function () {
        t.requireOk("conjoon.cn_imapuser.overrides.conjoon.cn_mail.data.mail.BaseSchema", function () {


            t.it("constructProxy()", function (t) {

                coon.user.Manager.getUser = function () {
                    return Ext.create("coon.user.model.UserModel", {
                        username: "demo",
                        password: "test"
                    });
                };

                const schema = Ext.create("conjoon.cn_mail.data.mail.BaseSchema"),
                    models = getModels();

                let proxy, i, len;

                for (i = 0, len = models.length; i < len; i++) {

                    Ext.create(models[i]);

                    proxy = schema.constructProxy(eval(models[i]));

                    t.expect(proxy.headers).toBeDefined();
                    t.expect(proxy.headers.Authorization).toBeDefined();
                    t.expect(proxy.headers.Authorization).toBe(
                        "Basic " + coon.user.Util.userToCredentials(coon.user.Manager.getUser(), coon.user.Util.BASIC_AUTH)
                    );
                }
            });

        });


    });});
