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

describe("conjoon.cn_imapuser.overrides.conjoon.cn_mail.view.mail.message.editor.MessageEditorViewControllerTest", function (t) {


    t.requireOk("conjoon.cn_imapuser.overrides.conjoon.cn_mail.view.mail.message.editor.MessageEditorViewController", function () {

        t.it("getSendMessageDraftRequestConfig()", function (t) {

            const ctrl = Ext.create("conjoon.cn_mail.view.mail.message.editor.MessageEditorViewController");


            const provider = Ext.create("coon.user.UserProvider");
            provider.user = Ext.create("coon.user.model.UserModel");

            coon.user.Manager.setUserProvider(provider);

            const messageDraft = Ext.create("conjoon.cn_mail.model.mail.message.MessageDraft", {
                mailFolderId : 1,
                mailAccountId : 1,
                id : 1
            });

            t.expect(ctrl.getSendMessageDraftRequestConfig(messageDraft)).toEqual({
                url    : "./cn_mail/SendMessage",
                params  : {
                    mailAccountId: "1",
                    mailFolderId: "1",
                    id: "1"
                },
                headers : {
                    Authorization: "Basic " + coon.user.Util.userToCredentials(provider.user, coon.user.Util.BASIC_AUTH)
                }
            });


        });


    });

});