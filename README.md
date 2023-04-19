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
	email: 'john.doe@example.com',
};

const schema = {
	name: { required: true, dataType: 'string', minLength: 2, maxLength: 50 },
	email: {
		required: true,
		dataType: 'string',
		regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
	},
	age: { required: false, dataType: 'number', min: 18, max: 60 },
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

`dataType` - The expected data type of the field. Possible values are string, number, boolean, object, and array.

`minLength` - The minimum length of a string field.

`maxLength` - The maximum length of a string field.

`min` - The minimum value of a number field.

`max` - The maximum value of a number field.

`regex` - A regular expression that the string field must match.

`additionalValuesAllowed` - Indicates whether additional keys in the actual data are allowed or not. Defaults to true.

# License

MIT
