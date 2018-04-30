module.exports = {
  meta: {
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
    return {
      ImportDeclaration: function(node) {
        if (
          node.source.type === "Literal" &&
          node.source.value === context.options[0].name
        ) {
          let message = `Module '${context.options[0].name}' is deprecated.`;
          if (context.options[0].use)
            message += ` Use '${context.options[0].use}' instead.`;
          context.report({
            node: node.source,
            message: message
          });
        }
      }
    };
  }
};
