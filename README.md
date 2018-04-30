# eslint-plugin-deprecate-import

An ESLint plugin to deprecate import statements

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-deprecate-import`:

```
$ npm install eslint-plugin-deprecate-import --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-deprecate-import` globally.

## Usage

Add `deprecate-import` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["deprecate-import"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "deprecate-import/rule-name": 2
  }
}
```

## Supported Rules

* [module](./docs/rules/module.md): Deprecates npm module imports
