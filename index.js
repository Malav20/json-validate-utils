function validateJSON(actualData, schema) {
    const issues = [];
  
    // Check if actualData and schema are both objects
    if (typeof actualData === 'object' && typeof schema === 'object') {
      // Loop through schema's keys
      Object.keys(schema).forEach((key) => {
        const keySchema = schema[key];
  
        // Check if key is required
        if (keySchema.required && !(key in actualData)) {
          issues.push({ fieldName: key, message: `'${key}' property is required` });
          return;
        }
  
        // Check data type
        if (key in actualData && typeof actualData[key] !== keySchema.type) {
          issues.push({ fieldName: key, message: `'${key}' property must be of type '${keySchema.type}'` });
          return;
        }
  
        // Check regular expression for strings
        if (keySchema.type === 'string' && keySchema.expression && !(new RegExp(keySchema.expression)).test(actualData[key])) {
          issues.push({ fieldName: key, message: `'${key}' property must match the regular expression defined in schema` });
        }
  
        // Check min and max values for strings and numbers
        if (['string', 'number'].includes(keySchema.type)) {
          if (keySchema.min !== undefined && actualData[key] < keySchema.min) {
            issues.push({ fieldName: key, message: `'${key}' property must be greater than or equal to ${keySchema.min}` });
          }
          if (keySchema.max !== undefined && actualData[key] > keySchema.max) {
            issues.push({ fieldName: key, message: `'${key}' property must be less than or equal to ${keySchema.max}` });
          }
        }
  
        // Recursively check nested objects
        if (keySchema.type === 'object' && typeof actualData[key] === 'object') {
          const nestedIssues = validateJSON(actualData[key], keySchema.schema);
          if (nestedIssues.length > 0) {
            issues.push(...nestedIssues);
            return;
          }
        }
      });
  
      // Check for extra keys in actualData
      Object.keys(actualData).forEach((key) => {
        if (!(key in schema)) {
          if (schema.additionalValuesAllowed === true) {
            // Allow extra keys if additionalValuesAllowed is true
            return;
          } else {
            // Flag extra keys as issues if additionalValuesAllowed is false
            issues.push({ fieldName: key, message: `Extra key '${key}' found in actual data` });
          }
        }
      });
    } else {
      // If actualData and schema are not both objects, compare them directly
      if (actualData !== schema) {
        issues.push({ fieldName: '', message: `Data mismatch: expected ${JSON.stringify(schema)}, but got ${JSON.stringify(actualData)}` });
      }
    }
  
    // Return true if there are no issues, otherwise return the issues array
    return issues.length === 0 ? true : issues;
  }

  module.exports.validateJSON = validateJSON