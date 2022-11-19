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

/**
 * @inheritdoc
 */
Ext.define("conjoon.cn_imapuser.overrides.conjoon.cn_mail.data.mail.account.proxy.MailAccountProxy", {

    override: "conjoon.cn_mail.data.mail.account.proxy.MailAccountProxy",

    requires: [
        "coon.user.Util",
        "coon.user.Manager"
    ],


    sendRequest (request) {

        const
            me = this,
            url = new URL(request.getUrl()),
            path = url.pathname;

        if (path.endsWith("/MailAccounts")) {
            request.setHeaders(
                Object.assign(
                    request.getHeaders()|| {},
                    {
                        Authorization: "Basic " + coon.user.Util.userToCredentials(
                            coon.user.Manager.getUser() , coon.user.Util.BASIC_AUTH
                        )
                    }
                )
            );
        }

        return me.callParent(arguments);
    }
});
