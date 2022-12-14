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
Ext.define("conjoon.cn_imapuser.data.request.Configurator", {

    extend: "coon.core.data.request.Configurator",

    requires: [

        // @define "l8"
        "l8",
        "coon.user.Util",
        "coon.user.Manager",
        "Ext.data.Request"
    ],


    configure (request) {

        const
            isDataRequest = request instanceof Ext.data.Request,
            headers = (isDataRequest ? request.getHeaders() : request.headers) || {},
            newHeaders = Object.assign(headers, {
                Authorization: "Basic " + coon.user.Util.userToCredentials(
                    coon.user.Manager.getUser() , coon.user.Util.BASIC_AUTH
                )
            });

        if (isDataRequest) {
            request.setHeaders(newHeaders);
        } else {
            request.headers = newHeaders;
        }

        return request;
    }
});
