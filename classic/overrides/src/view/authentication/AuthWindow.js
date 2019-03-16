/**
 * conjoon
 * app-cn_imapuser
 * Copyright (C) 2019 Thorsten Suckow-Homberg https://github.com/conjoon/app-cn_imapuser
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
Ext.define('conjoon.cn_imapuser.overrides.cn_user.view.authentication.AuthWindow', {

    override: 'coon.user.view.authentication.AuthWindow',

    header : false,

    bodyCls: 'x-fa cn_user-authwindow',


    layout : {
        type  : 'vbox',
        align : 'stretch'
    },


    /**
     * @inheritdoc
     */
    initComponent : function() {

        var me = this;

        me.items = [{
            xtype  : 'container',
            flex   : 1,
            layout : {
                type  : 'vbox',
                align : 'center',
                pack  : 'center'
            },
            items : [
                me.items[0]
            ]
        }, {
            xtype : 'box',
            height : 80,
            cls   : 'copyrights',
            html  : '<div class="cont">' +
                '<div class="prod">conjoon</div>' +
                '<div class="meta">' +
                '<span><a target="_blank" href="http://conjoon.org">About</a></span>' +
                '<span>&#169; 2007-2019 conjoon Open Source Project</span>' +
                '</div>' +
                '</div>'
        }];

        me.callParent(arguments);
    }

});
