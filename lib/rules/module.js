module.exports = {
  meta: {
    schema: {
      type: "array",
      minItems: 1,
      uniqueItems: true,
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          use: { type: "string" }
        },
        required: ["name"],
        additionalProperties: false
      }
    }
  },

  create: function(context) {
    return {
      ImportDeclaration: function(node) {
        if (node.source.type === "Literal") {
          const option = context.options.find(
            f => f.name === node.source.value
          );
          if (option) {
            let message = `Module '${option.name}' is deprecated.`;
            if (option.use) message += ` Use '${option.use}' instead.`;
            context.report({
              node: node.source,
              message: message
            });
          }
        }
      }
    };
  }
};
