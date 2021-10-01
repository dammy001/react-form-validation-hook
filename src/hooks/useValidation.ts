/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-expressions */
import { useReducer } from 'react';
import ValidationRules from '../utils/validationRules';

const validate = ({ value, values, checks, customValidator }: any) => {
 if (checks) {
  const rules = checks.split('|');

  if (rules.length) {
   for (const rule in rules) {
    const ruleName = rules[rule];
    const validation = ValidationRules[ruleName];

    const isRuleSatisfied =
     ruleName !== 'required' && !value
      ? true
      : validation.rule().test(value.toString());

    if (
     ruleName.match(/nullable/) &&
     (!value || (value?.constructor === Array && value.length < 1))
    ) {
     return true;
    }

    if (!isRuleSatisfied) {
     return validation.formatter.apply(null, [value]);
    }
   }
  }
 }
 return typeof customValidator === 'function' && customValidator(value, values);
};

const reducer = (state: any, action: any) => {
 switch (action.type) {
  case 'UPDATE_FIELD':
   return {
    ...state,
    errors: {
     ...state.errors,
     [action.payload.key]: validate({
      key: action.payload.key,
      value: action.payload.value,
      values: state.values,
      checks: state.checks[action.payload.key],
      customValidator: state.validators[action.payload.key],
     }),
    },
    values: {
     ...state.values,
     [action.payload.key]: action.payload.value,
    },
   };
  default:
   return state;
 }
};

const useValidation = (inputs: any) => {
 const initial: any = {
  checks: {},
  values: {},
  validators: {},
  errors: {},
 };

 for (const key in inputs) {
  initial.checks[key] = inputs[key]?.checks;
  initial.validators[key] = inputs[key]?.validate;
  initial.values[key] = inputs[key]?.value;
  initial.errors[key] = '';
 }

 const [fields, setFormField] = useReducer(reducer, initial);

 const validateField = ({ key, value }: any) => {
  if (fields.values[key] === undefined) {
   throw Error(`Field with key "${key}" not found, please make sure it is define in as follows:
      useFormValidator({
        ${key}: {
          value: "",
          checks: "required"
        }
      })
      `);
  }

  setFormField({
   type: 'UPDATE_FIELD',
   payload: {
    key,
    value,
   },
  });
 };

 const isFieldValid = (key: any) => {
  validateField({
   key,
   value: fields.values[key],
  });
  if (fields.errors[key]) return false;
  return true;
 };

 const updateField = (e: any) => {
  validateField({
   key: e.target.name,
   value: e.target.value,
  });
 };

 const isAllFieldsValid = () => {
  let valid = true;

  for (const key in fields.values) {
   const error = validate({
    value: fields.values[key],
    checks: fields.checks[key],
   });

   if (error) valid = false;

   setFormField({
    type: 'UPDATE_FIELD',
    payload: {
     key,
     value: fields.values[key],
     checks: fields.checks[key],
    },
   });
  }

  return valid;
 };

 return {
  values: fields.values,
  errors: fields.errors,
  isAllFieldsValid,
  isFieldValid,
  updateField,
 };
};

export default useValidation;
