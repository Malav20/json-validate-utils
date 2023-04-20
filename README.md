# json-validate-utils

A lightweight JSON validator for Node.js and browser environments, with support for advanced validation features.

## Installation

You can install `json-validate-utils` via npm:

## Usage

`json-validate-utils` provides a `validateJSON` method that takes in two parameters:

- `actualData` - The JSON data that needs to be validated.
- `schema` - The JSON schema to compare the `actualData` against.

The method returns an object containing an array of issues found in the `actualData`, with each issue represented as an object containing the `fieldName` and `message`.

Here's an example of how to use `validateJSON`:

```js
const { validateJSON } = require('json-validate-utils');

const actualData = {
	name: 'John Doe',
	email: 'john.doe@example.com',
};

const schema = {
	name: { required: true, type: 'string', min: 2, max: 50 },
	email: {
		required: true,
		type: 'string',
		regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
	},
	age: { required: false, type: 'number', min: 18, max: 60 },
};

const result = validateJSON(actualData, schema);

if (result.issues.length === 0) {
	console.log('JSON is valid');
} else {
	console.log('JSON is invalid');
	console.log(result.issues);
}
```

# API

`validateJSON(actualData, schema)`

Validates the `actualData` against the provided `schema`.

`actualData` - The JSON data that needs to be validated.

`schema` - The JSON schema to compare the `actualData` against.

Returns an object containing an array of issues found in the `actualData`, with each issue represented as an object containing the fieldName and message.

# Schema Properties

The following properties can be used in the `schema` object:

`required` - Indicates whether the field is required or not. Defaults to false.

`type` - The expected data type of the field. Possible values are string, number, boolean, object, and array.

`min` - The minimum value of a number field.

`max` - The maximum value of a number field.

`regex` - A regular expression that the string field must match.

`additionalValuesAllowed` - Indicates whether additional keys in the actual data are allowed or not. Defaults to true.

# License

MIT
