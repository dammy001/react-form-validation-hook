/* eslint-disable no-unused-expressions */
/* eslint-disable default-case */
const ValidationRules: any = {
 email: {
  rule: (): any =>
   /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
  formatter: (fieldName: string): string => {
   return `${fieldName} is not valid email`;
  },
 },
 required: {
  rule: (): any => /\S/,
  formatter: (): string => {
   return 'This field is required.';
  },
 },
 numeric: {
  rule: (): any => /^\d+$/,
  formatter: (fieldName: number | string): string => {
   return `${fieldName} should contain only numbers.`;
  },
 },
 alphaNumeric: {
  rule: (): any => /^[a-z0-9]+$/i,
  formatter: (fieldName: string): string => {
   return `${fieldName} should not contain special characters, please use only alphabets and numbers.`;
  },
 },
 alphabetic: {
  rule: (): any => /^[a-z]+$/i,
  formatter: (fieldName: string): string => {
   return `${fieldName} should contain only alphabets.`;
  },
 },
 maxLength: {
  rule: (number: number): any => ({
   test: (value: { length: number }) => value.length <= number,
  }),
  formatter: (fieldName: string, number: number): string => {
   return number
    ? `${fieldName} can contain maximum ${number} characters.`
    : `${fieldName} contains more characters than expected.`;
  },
 },
 minLength: {
  rule: (number: number): any => ({
   test: (value: { length: number | string }) => value.length >= number,
  }),
  formatter: (fieldName: string, number: number): string => {
   return number
    ? `${fieldName} should contain minimum ${number} characters.`
    : `${fieldName} contains less characters than expected.`;
  },
 },
 phone: {
  rule: (): any => /^(\+|)(234|0)(7|8|9)(0|1)\d{8}$/,
  formatter: (value: number): string =>
   `${value} should contain valid phone number`,
 },
};

export default ValidationRules;
