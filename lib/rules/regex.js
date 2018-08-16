module.exports = {
  meta: {
    schema: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'object',
        properties: {
          pattern: { type: 'string' },
          use: { type: 'string' },
        },
        required: ['pattern'],
        additionalProperties: false,
      },
    },
  },

  create: function(context) {
    return {
      ImportDeclaration: function(node) {
        if (node.source.type === 'Literal') {
          const matches = context.options.filter(f => {
            const regex = new RegExp(f.pattern);
            return node.source.value.match(regex);
          });
          if (matches) {
            matches.forEach(match => {
              let message = `Module '${match.pattern}' is deprecated.`;
              if (match.use) message += ` Use '${match.use}' instead.`;
              context.report({
                node: node.source,
                message: message,
              });
            });
          }
        }
      },
    };
  },
};
