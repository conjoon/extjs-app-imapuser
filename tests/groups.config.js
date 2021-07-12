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

export default [{
    group: "overrides",
    items: [{
        group: "coon",
        items: [{
            group: "user",
            items: [{
                group: "view",
                items: [{
                    group: "authentication",
                    items: [
                        "overrides/coon/user/view/authentication/AuthFormTest.js"
                    ]
                }]
            }]
        }]
    },{
        group: "conjoon",
        items: [{
            group: "cn_mail",
            items: [{
                group: "data",
                items: [{
                    group: "mail",
                    items: [
                        "overrides/conjoon/cn_mail/data/mail/BaseSchemaTest.js"
                    ]
                }]
            }, {
                group: "view",
                items: [{
                    group: "mail",
                    items: [{
                        group: "message",
                        items: [{
                            group: "editor",
                            items: [
                                "overrides/conjoon/cn_mail/view/mail/message/editor/MessageEditorViewControllerTest.js"
                            ]
                        }]
                    }]
                }]
            }]
        }]
    }]
}, {
    group: "universal",
    items: [
        "src/UserProviderTest.js", {
            group: "app",
            items: [
                "src/app/PackageControllerTest.js"
            ]
        }]
}];
