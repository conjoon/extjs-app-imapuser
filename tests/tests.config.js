/**
 * conjoon
 * extjs-app-imapuser
 * Copyright (C) 2017-2022 Thorsten Suckow-Homberg https://github.com/conjoon/extjs-app-imapuser
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
 *
 */
export default {

    name: "extjs-app-imapuser",

    timeout: 750,


    loaderPath: {

        "conjoon.cn_imapuser": "../src",

        "conjoon.cn_imapuser.overrides.coon.user.view.authentication.AuthForm": "../classic/overrides/coon.user.view.authentication.AuthForm.js",

        "coon.user.view.authentication.AuthWindow": "../../node_modules/@coon-js/extjs-app-user/src/view/authentication/AuthWindow.js",

        "conjoon.cn_mail": "../../node_modules/@conjoon/extjs-app-webmail/src/",

        "coon.user": "../../node_modules/@coon-js/extjs-app-user/src/",
        "coon.user.view": "../../node_modules/@coon-js/extjs-app-user/classic/src/view",
        "coon.user.view.toolbar": "../../node_modules/@coon-js/extjs-app-user/src/view/toolbar",

        "coon.core": "../../node_modules/@coon-js/extjs-lib-core/src/",

        "coon.comp.window": "../../node_modules/@coon-js/extjs-lib-comp/src/window",
        "coon.comp.toolbar": "../../node_modules/@coon-js/extjs-lib-comp/src/toolbar",
        "coon.comp": "../../node_modules/@coon-js/extjs-lib-comp/classic/src",

        "conjoon.dev.cn_imapusersim": "../../node_modules/@conjoon/extjs-dev-imapusersim/src"

    },

    preload: {
        js: [
            "../node_modules/@l8js/l8/dist/l8.runtime.umd.js"
        ]
    }
};

