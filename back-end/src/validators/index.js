const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const { ValidatorError } = require("../errors/ValidatorError");

const ajv = new Ajv({ allErrors: true, removeAdditional: true });

const validatorsPath = __dirname;
const validatorFileNameExtension = '.schema.json';
const files = fs.readdirSync(validatorsPath);

files.forEach( file => {
    if (!file.endsWith( validatorFileNameExtension )) {
        return;
    }

    const name = file.replace(validatorFileNameExtension, '');
    ajv.addSchema( require(path.join(validatorsPath, file)), name );
});

module.exports = {
    /**
     * @param {string} schemaName Name of the schema to use (generated from the file name)
     * @param {*} data
     *
     * @throws {ValidatorError} Data doesn't match the schema definition
     * @throws {Error} Schema not found
     */
    validate: (schemaName, data) => {
        const validator = ajv.getSchema(schemaName);
        if (!validator) {
            throw new Error(`Validator "${schemaName}" not found.`);
        }

        const valid = validator(data);
        if (!valid) {
            throw new ValidatorError(validator.errors);
        }
    },
    Validator: ajv
};
