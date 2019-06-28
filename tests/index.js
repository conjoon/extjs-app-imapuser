var harness = new Siesta.Harness.Browser.ExtJS();

harness.configure({
    title          : 'app-cn_imapuser',
    disableCaching : true,
    loaderPath     : {

        /**
         * ux
         */
        'Ext.ux' : "../../../../ext/packages/ux/src/",

        /**
         * Universal
         */
        'conjoon.cn_imapuser'      : '../src',

        /**
         * Overrides
         */
        'conjoon.cn_imapuser.overrides.conjoon'      : '../overrides/conjoon',


        /**
         * Classic
         */

        /**
         * Requirements
         */

        'conjoon.cn_mail' : '../../app-cn_mail/src/',

        'coon.user'   : '../../lib-cn_user/src/',
        'coon.user.view'   : '../../lib-cn_user/classic/src/view',

        'coon.core'   : '../../lib-cn_core/src/',

        'coon.comp'   : '../../lib-cn_comp/classic/src'

    },
    preload        : [
        conjoon.tests.config.paths.extjs.css.url,
        conjoon.tests.config.paths.conjoon.css.url,
        conjoon.tests.config.paths.extjs.js.url
    ]
});

harness.start({
    group : 'overrides',
    items : [{
        group : 'conjoon',
        items : [{
            group : 'cn_mail',
            items : [{
                group : 'data',
                items : [{
                    group : 'mail',
                    items : [
                        'overrides/conjoon/cn_mail/data/mail/BaseSchemaTest.js'
                    ]
                }]
            }]
        }]
    }]
}, {
    group : 'universal',
    items : [{
        group : 'app',
        items : [
            'src/app/PackageControllerTest.js'
        ]
    }]
});
