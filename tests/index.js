var harness = new Siesta.Harness.Browser.ExtJS();

harness.configure({
    title          : "app-cn_imapuser",
    disableCaching : true,
    loaderPath     : {

        /**
         * ux
         */
        "Ext.ux" : "../../../../ext/packages/ux/src/",

        /**
         * Universal
         */
        "conjoon.cn_imapuser"      : "../src",

        /**
         * Overrides
         */
        "conjoon.cn_imapuser.overrides.conjoon"      : "../overrides/conjoon",

        "conjoon.cn_imapuser.overrides.coon.user.view" : "../classic/overrides/coon/user/view",

        /**
         * Classic
         */

        /**
         * Requirements
         */
        "coon.user.view.authentication.AuthWindow"   : "../../lib-cn_user/src/view/authentication/AuthWindow.js",

        "conjoon.cn_mail" : "../../app-cn_mail/src/",

        "coon.user"   : "../../lib-cn_user/src/",
        "coon.user.view"   : "../../lib-cn_user/classic/src/view",

        "coon.user.view.toolbar"   : "../../lib-cn_user/src/view/toolbar",

        "coon.core"   : "../../lib-cn_core/src/",

        "coon.comp.window"   : "../../lib-cn_comp/src/window",
        "coon.comp.toolbar"   : "../../lib-cn_comp/src/toolbar",
        "coon.comp"   : "../../lib-cn_comp/classic/src",

        "conjoon.dev.cn_imapusersim"   : "../../dev-cn_imapusersim/src"

    },
    preload        : [
        conjoon.tests.config.paths.extjs.css.url,
        conjoon.tests.config.paths.conjoon.css.url,
        conjoon.tests.config.paths.extjs.js.url
    ]
});

harness.start({
    group : "overrides",
    items : [{
        group : "coon",
        items : [{
            group : "user",
            items : [{
                group : "view",
                items : [{
                    group : "authentication",
                    items : [
                        "overrides/coon/user/view/authentication/AuthFormTest.js"
                    ]
                }]
            }]
        }]
    },{
        group : "conjoon",
        items : [{
            group : "cn_mail",
            items : [{
                group : "data",
                items : [{
                    group : "mail",
                    items : [
                        "overrides/conjoon/cn_mail/data/mail/BaseSchemaTest.js"
                    ]
                }]
            }, {
                group : "view",
                items : [{
                    group : "mail",
                    items : [{
                        group : "message",
                        items : [{
                            group : "editor",
                            items : [
                                "overrides/conjoon/cn_mail/view/mail/message/editor/MessageEditorViewControllerTest.js"
                            ]
                        }]
                    }]
                }]
            }]
        }]
    }]
}, {
    group : "universal",
    items : [
        "src/UserProviderTest.js", {
            group : "app",
            items : [
                "src/app/PackageControllerTest.js"
            ]
        }]
});
