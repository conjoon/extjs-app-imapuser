/**
 * coon.js
 * lib-cn_user
 * Copyright (C) 2019 Thorsten Suckow-Homberg https://github.com/coon-js/lib-cn_user
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
 * This is the package controller of the lib-cn_user package to be used with
 * {@link coon.comp.app.Application}.
 *
 * This controller will hook into the launch-process of {@link coon.comp.app.Application#launch},
 * check if a user is available via {@link coon.user.Manager#getUser} and
 * show {@link coon.user.view.authentication.AuthWindow} to provide
 * an authentication form. The {@link #preLaunchHook} method will return false until
 * a user is available via {@link coon.user.Manager}.
 *
 *      @example
 *      Ext.define('coon.Application', {
 *
 *          extend : 'coon.comp.app.Application',
 *
 *          mainView : 'Ext.Panel',
 *
 *          // If specifying the PackageController in the requires-property of the app.json of the
 *          // application which uses this package, you can omit the this.
 *          controllers : [
 *              'coon.user.app.PackageController'
 *          ]
 *
 *      });
 *
 *
 */
Ext.define('conjoon.cn_imapuser.app.PackageController', {

    extend : 'coon.user.app.PackageController'


});