var rule = require('../../../lib/rules/module'),
  RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('module', rule, {
  valid: [
    {
      code: "import * as foo from 'supported-module'",
      options: [{ pattern: 'deprecated-module' }],
      parser: 'babel-eslint',
    },
    {
      code: "import foo from 'supported-module'",
      options: [{ pattern: 'deprecated-module' }],
      parser: 'babel-eslint',
    },
    {
      code: "import { foo } from 'supported-module'",
      options: [{ pattern: 'deprecated-module' }],
      parser: 'babel-eslint',
    },
    {
      code: "import foo from 'supported-module/supported-function'",
      options: [{ pattern: '^.*-module$' }],
      parser: 'babel-eslint',
    },
  ],

  invalid: [
    {
      code: "import * as foo from 'deprecated-module'",
      options: [{ pattern: 'deprecated-module', use: 'supported-module' }],
      errors: [
        {
          message:
            "Module 'deprecated-module' is deprecated. Use 'supported-module' instead.",
          type: 'Literal',
        },
      ],
      parser: 'babel-eslint',
    },
    {
      code: "import foo from 'deprecated-module'",
      options: [{ pattern: 'deprecated-module' }],
      errors: [
        {
          message: "Module 'deprecated-module' is deprecated.",
          type: 'Literal',
        },
      ],
      parser: 'babel-eslint',
    },
    {
      code: "import { foo } from 'deprecated-module/deprecated-sub-module'",
      options: [{ pattern: 'deprecated-module.*', use: 'supported-module' }],
      errors: [
        {
          message:
            "Module 'deprecated-module.*' is deprecated. Use 'supported-module' instead.",
          type: 'Literal',
        },
      ],
      parser: 'babel-eslint',
    },
    {
      code: "import foo from 'deprecated-module'",
      options: [{ pattern: '^.*-module$' }],
      errors: [
        {
          message: "Module '^.*-module$' is deprecated.",
          type: 'Literal',
        },
      ],
      parser: 'babel-eslint',
    },
    {
      code: "import foo from 'deprecated-module'",
      options: [
        { pattern: '^.*-module$' },
        { pattern: 'deprecated-module/deprecated-function' },
      ],
      errors: [
        {
          message: "Module '^.*-module$' is deprecated.",
          type: 'Literal',
        },
      ],
      parser: 'babel-eslint',
    },
    {
      code: "import foo from 'deprecated-module'",
      options: [
        { pattern: 'deprecated-module/deprecated-function' },
        { pattern: '^.*-module$' },
      ],
      errors: [
        {
          message: "Module '^.*-module$' is deprecated.",
          type: 'Literal',
        },
      ],
      parser: 'babel-eslint',
    },
    {
      code: "import foo from 'deprecated-module'",
      options: [{ pattern: '^deprecated-.*$' }, { pattern: '^.*-module$' }],
      errors: [
        {
          message: "Module '^deprecated-.*$' is deprecated.",
          type: 'Literal',
        },
        {
          message: "Module '^.*-module$' is deprecated.",
          type: 'Literal',
        },
      ],
      parser: 'babel-eslint',
    },
  ],
});
