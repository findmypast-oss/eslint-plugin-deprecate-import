# Deprecates a module import (module)

Deprecates a module import. A typical use case would be when you wish to swap an old package out in favour of a new one.

## Rule Details

This rule aims to deprecate module imports.

### Rule Declaration

```js
{
    'deprecate-import/module': [
      'error',
      {
        name: 'deprecated-module',
        use: 'supported-module',
      },
    ]
}
```

### Pass

```js
import * as foo from "supported-module";

import foo from "supported-module";

import { foo } from "node_modules/deprecated-module";
```

### Fail

```js
import * as foo from "deprecated-module";

import foo from "deprecated-module";

import { foo } from "deprecated-module";
```

The output of the above failures gives the following message:

_Module 'deprecated-module' is deprecated. Use 'supported-module' instead._

### Options

| key  | type     | required | description                                                                                        |
| ---- | -------- | -------- | -------------------------------------------------------------------------------------------------- |
| name | `string` | yes      | The name of the module you wish to deprecate. This is an exact string match only.                  |
| use  | `string` | no       | The name of the module that you wish to be used instead. This will be included in linting reports. |
