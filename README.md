# json-validator-plus

A lightweight JSON validator for Node.js and browser environments, with support for advanced validation features.

## Installation

You can install `json-validator-plus` via npm:


## Usage

`json-validator-plus` provides a `validateJSON` method that takes in two parameters:

- `actualData` - The JSON data that needs to be validated.
- `schema` - The JSON schema to compare the `actualData` against.

The method returns an object containing an array of issues found in the `actualData`, with each issue represented as an object containing the `fieldName` and `message`.

Here's an example of how to use `validateJSON`:

```js
const { validateJSON } = require('json-validator-plus');

const actualData = {
  name: 'John Doe',
  email: 'john.doe@example.com'
};

const schema = {
  name: { required: true, dataType: 'string', minLength: 2, maxLength: 50 },
  email: { required: true, dataType: 'string', regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
  age: { required: false, dataType: 'number', min: 18, max: 60 }
};

const result = validateJSON(actualData, schema);

if (result.issues.length === 0) {
  console.log('JSON is valid');
} else {
  console.log('JSON is invalid');
  console.log(result.issues);
}


