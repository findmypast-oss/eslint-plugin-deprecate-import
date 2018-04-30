/**
 * @fileoverview Deprecates a module import
 * @author findmypast
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Deprecates a module import",
      category: "Fill me in",
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      {
        type: "object",
        properties: {
          name: { type: "string" },
          use: { type: "string" }
        },
        required: ["name"],
        additionalProperties: false
      }
    ]
  },

  create: function(context) {
    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ImportDeclaration: function(node) {
        if (
          node.source.type === "Literal" &&
          node.source.value === context.options[0].name
        ) {
          context.report({
            node: node.source,
            message: `Module '${context.options[0].name}' is deprecated. Use '${
              context.options[0].use
            }' instead.`
          });
        }
      }
    };
  }
};
