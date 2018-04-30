var rule = require("../../../lib/rules/module"),
  RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("module", rule, {
  valid: [
    {
      code: "import * as foo from 'supported-module'",
      options: [{ name: "deprecated-module" }],
      parser: "babel-eslint"
    },
    {
      code: "import foo from 'supported-module'",
      options: [{ name: "deprecated-module" }],
      parser: "babel-eslint"
    },
    {
      code: "import { foo } from 'node-modules/deprecated-module'",
      options: [{ name: "deprecated-module" }],
      parser: "babel-eslint"
    }
  ],

  invalid: [
    {
      code: "import * as foo from 'deprecated-module'",
      options: [{ name: "deprecated-module", use: "supported-module" }],
      errors: [
        {
          message:
            "Module 'deprecated-module' is deprecated. Use 'supported-module' instead.",
          type: "Literal"
        }
      ],
      parser: "babel-eslint"
    },
    {
      code: "import foo from 'deprecated-module'",
      options: [{ name: "deprecated-module" }],
      errors: [
        {
          message: "Module 'deprecated-module' is deprecated.",
          type: "Literal"
        }
      ],
      parser: "babel-eslint"
    },
    {
      code: "import { foo } from 'another-deprecated-module'",
      options: [
        { name: "deprecated-module", use: "supported-module" },
        { name: "another-deprecated-module", use: "another-supported-module" }
      ],
      errors: [
        {
          message:
            "Module 'another-deprecated-module' is deprecated. Use 'another-supported-module' instead.",
          type: "Literal"
        }
      ],
      parser: "babel-eslint"
    }
  ]
});
