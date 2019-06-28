var harness = new Siesta.Harness.Browser.ExtJS();

harness.configure({
    title          : 'app-cn_imapuser',
    disableCaching : true,
    loaderPath     : {

        /**
         * ux
         */
        'Ext.ux' : "../../../../ext/packages/ux/src/",////bryntum.com/examples/extjs-6.0.1/build/ext-all.js"

        /**
         * Universal
         */
        'conjoon.cn_imapuser'      : '../src',

        /**
         * Classic
         */

        /**
         * Requirements
         */
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
    group : 'universal',
    items : [{
        group : 'app',
        items : [
            'src/app/PackageControllerTest.js'
        ]
    }]
});
