# React Form Validation Hook

### Install

#### NPM

```
npm i @damilaredev/react-form-validation-hook
```

#### Yarn

```
yarn add @damilaredev/react-form-validation-hook
```

### Usage

```javascript
import React, { FC, useState } from 'react';
import useFormValidator from '@damilaredev/react-form-validation-hook'

const Login: FC = () => {
 const { values, errors, updateField, isAllFieldsValid } = useFormValidator({
  email: {
   value: '',
   checks: 'required|email', //using pipe to seperate validation rule
  },
  password: {
   value: '',
   checks: 'required|digitsBetween:3,5|in:damilare,maxwell,notIn:christiana',
  }
 });

 const submitCredentials = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!isAllFieldsValid()) return false;

  const { email, password } = values;
 };

 return (
     <input className="w-full h-5 p-3" type="text" name="email" placeholder="Email Address" onChange={updateField} />
      {errors && <span className="text-red-500 text-sm mt-1">{errors[key]}</span>}
 )
};
```

## Available validation rules

- required
- email
- numeric
- alphabetic
- alphaNumeric
- maxLength
- minLength
- phone
- url
- size
- in
- digitsBetween
- notIn
- regex
- cardNumber

stay patient more validation rules are coming...
