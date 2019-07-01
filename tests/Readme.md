# app-cn_imapuser - Tests - Read Me

app-cn_imapuser [Siesta](http://bryntum.com) for Unit/UI testing.

Make sure you set the paths to the resources properly in the files index.html.template and
tests.config.js.template, then rename them:

```
index.html.template -> index.html
tests.config.js.template -> tests.config.js
```

# Requirements
The tests require [lib-cn_user](https://github.com/coon-js/lib-cn_user) and [app-cn_mail](https://github.com/conjoon/app-cn_mail). Make sure you adjust the paths to
this library in the index.js if both packages are not part of a regular local
package directory layout in a sencha workspace.
Additionally, you will need [dev-cn_imapusersim](https://github.com/conjoon/dev-cn_imapusersim).
This is a dev-package and usually not part of any package distribution. Make sure you place this
package in your local package directory to make sure tests can be processed.