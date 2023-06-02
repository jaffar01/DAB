import Ajv from 'ajv';

export function ValidateJSON(schema, data) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  if (validate(data)) {
    return [true];
  } else {
    return [false, validate.errors];
  }
}
