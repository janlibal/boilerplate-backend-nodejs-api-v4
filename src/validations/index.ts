import jsonschema from 'jsonschema'
import * as errors from '../utils/errors'
import logger from '../utils/logger'

async function validate(schema:any, inputData:any) {
  const validator = new jsonschema.Validator()
  schema.additionalProperties = false
  const validationErrors = validator.validate(inputData, schema).errors
  if (validationErrors.length > 0) {
    logger.info(new errors.RequestValidationErrors(validationErrors.toString()))
    throw new errors.RequestValidationErrors(validationErrors.toString())
  }
}

export default validate