# Deprecates a module import (module)

Deprecates a module import. A typical use case would be when you wish to swap an old package out in favour of a new one.

## Rule Details

This rule aims to deprecate module imports.

### Rule Declaration

```js
{
    "deprecate-import/module": [
      "error",
      {
        name: "deprecated-module",
        use: "supported-module",
      },
      {
        name: "another-deprecated-module"
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

import { foo } from "another-deprecated-module";
```

The output of the first two above failures gives the following message:

> Module 'deprecated-module' is deprecated. Use 'supported-module' instead.

The output of the last above failure gives the following message:

> Module 'another-deprecated-module' is deprecated.

### Options

Takes one or more objects with the following properties:

| key  | type     | required | description                                                                                        |
| ---- | -------- | -------- | -------------------------------------------------------------------------------------------------- |
| name | `string` | yes      | The name of the module you wish to deprecate. This is an exact string match only.                  |
| use  | `string` | no       | The name of the module that you wish to be used instead. This will be included in linting reports. |
