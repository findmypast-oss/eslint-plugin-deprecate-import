/**
 * @fileoverview Deprecates a module import
 * @author findmypast
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/module"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("module", rule, {
  valid: [
    {
      code: "import * as supported from 'supported-module'",
      options: [{ name: "deprecated-module" }],
      parser: "babel-eslint"
    },
    {
      code: "import supported from 'supported-module'",
      options: [{ name: "deprecated-module" }],
      parser: "babel-eslint"
    },
    {
      code: "import { supported } from 'supported-module'",
      options: [{ name: "deprecated-module" }],
      parser: "babel-eslint"
    }
  ],

  invalid: [
    {
      code: "import * as deprecated from 'deprecated-module'",
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
      code: "import deprecated from 'deprecated-module'",
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
      code: "import { deprecated } from 'deprecated-module'",
      options: [{ name: "deprecated-module", use: "supported-module" }],
      errors: [
        {
          message:
            "Module 'deprecated-module' is deprecated. Use 'supported-module' instead.",
          type: "Literal"
        }
      ],
      parser: "babel-eslint"
    }
  ]
});
