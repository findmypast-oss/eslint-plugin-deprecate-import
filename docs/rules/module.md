# Deprecates a module import by regex pattern match (module)

Deprecates a module import by regex pattern matching. A typical use case would be when you wish to swap an old package out in favour of a new one.

## Rule Details

This rule aims to deprecate module imports via a regex. This is particularly useful when you wish to deprecate an entire module, including sub-module. Or alternatively, deprecate a series of sub-modules, but not the module itself.

### Rule Declaration

```js
{
    "deprecate-import/module": [
      "error",
      {
        name: "^deprecated-module.*",
        use: "supported-module",
      },
      {
        name: "^another-deprecated-module.*"
      },
    ]
}
```

### Pass

With the configuration:

```js
options: [{ pattern: "deprecated-module" }]
```

The following statements will pass:

```js
import * as foo from "supported-module";

import foo from "supported-module";

import { foo } from "supported-module";
```

With the configuration:

```js
options: [{ pattern: "^.*-module$" }]
```

The following statements will pass:

```js
import foo from "supported-module/supported-function";
```

### Fail

With the configuration:

```js
options: [{ pattern: "deprecated-module", use: "supported-module" }]
```

The following statements will fail:

```js
import * as foo from "deprecated-module";
```

With the error message:

> Module 'deprecated-module' is deprecated. Use 'supported-module' instead.

---

With the configuration:

```js
options: [{ pattern: "deprecated-module" }]
```

The following statements will fail:

```js
import foo from "deprecated-module";
```

With the error message:

> Module 'deprecated-module' is deprecated.

---

With the configuration:

```js
options: [{ pattern: "deprecated-module.*", use: "supported-module" }]
```

The following statements will fail:

```js
import { foo } from "deprecated-module/deprecated-sub-module";
```

With the error message:

> Module 'deprecated-module.*' is deprecated. Use 'supported-module' instead.

---

With the configuration:

```js
options: [{ pattern: "^.*-module$" }]
```

The following statements will fail:

```js
import foo from "deprecated-module";
```

With the error message:

> Module '^.*-module$' is deprecated.

---

With the configuration:

```js
options: [
    { pattern: "^.*-module$" },
    { pattern: "deprecated-module/deprecated-function" },
  ]
```

The following statements will fail:

```js
import foo from "deprecated-module";
```

With the error message:

> Module '^.*-module$' is deprecated.

---

With the configuration:

```js
options: [
    { pattern: "deprecated-module/deprecated-function" },
    { pattern: "^.*-module$" },
  ]
```

The following statements will fail:

```js
import foo from "deprecated-module";
```

With the error message:

> Module '^.*-module$' is deprecated.

---

With the configuration:

```js
options: [{ pattern: "^deprecated-.*$" }, { pattern: "^.*-module$" }]
```

The following statements will fail:

```js
import foo from "deprecated-module";
```
 
 With the error messages:
  
> Module '^deprecated-.*$' is deprecated.

> Module '^.*-module$' is deprecated.

### Options

Takes one or more objects with the following properties:

| key     | type     | required | description                                                                                        |
| ------- | -------- | -------- | -------------------------------------------------------------------------------------------------- |
| pattern | `string` | yes      | The string pattern of the module(s) you wish to deprecate. Must be a valid regex.                  |
| use     | `string` | no       | The name of the module that you wish to be used instead. This will be included in linting reports. |
