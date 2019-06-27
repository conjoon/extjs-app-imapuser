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
 * Custom styles for the AuthForm.
 */
Ext.define('conjoon.cn_imapuser.overrides.cn_user.view.authentication.AuthForm', {

    override: 'coon.user.view.authentication.AuthForm',


    initComponent : function() {

        var me = this;

        Ext.apply(me.items[0], {
            cls    : 'x-fa fa-envelope badge head-label',
            text   : undefined,
            margin : '-40 0 0 0'
        });

        Ext.apply(me.items[1], {
            height    : 55,
            hideLabel : true,
            triggers  : {
                glyphed  : {
                    cls : 'trigger-glyph-noop auth-email-trigger'
                }
            },
            emptyText : 'email-address'
        });

        Ext.apply(me.items[2], {
            height    : 55,
            hideLabel : true,
            triggers  : {
                glyphed  : {
                    cls : 'trigger-glyph-noop auth-password-trigger'
                }
            }
        });

        Ext.apply(me.items[3], {
            ui        : 'cn-btn-xl-soft-darkblue',
            scale     : 'large',
            iconAlign : 'right'
        });

        Ext.apply(me.items[4], {
            /**
             * @i18n
             */
            text : "Authentication against the list of valid IMAP servers failed. Please try again or use a different Email-Address."
        });

        me.callParent(arguments);
    }

});


