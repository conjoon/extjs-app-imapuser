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

/**
 * @inheritdoc
 */
Ext.define("conjoon.cn_imapuser.overrides.conjoon.cn_mail.view.mail.message.editor.MessageEditorViewController", {

    override: "conjoon.cn_mail.view.mail.message.editor.MessageEditorViewController",

    requires: [
        "coon.user.Util",
        "coon.user.Manager"
    ],

    privates: {

        /**
         * @inheritdoc
         */
        getSendMessageDraftRequestConfig: function (messageDraft) {

            const me = this,
                cfg = me.callParent(arguments);

            cfg.headers = {
                Authorization: "Basic " + coon.user.Util.userToCredentials(
                    coon.user.Manager.getUser() , coon.user.Util.BASIC_AUTH
                )
            };

            return cfg;
        }

    }

});
