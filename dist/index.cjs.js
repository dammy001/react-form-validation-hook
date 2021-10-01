var e=require("react"),r=function(){return(r=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++)for(var a in r=arguments[n])Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a]);return e}).apply(this,arguments)},n={email:{rule:function(){return/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i},formatter:function(e){return e+" is not valid email"}},required:{rule:function(){return/\S/},formatter:function(){return"This field is required."}},numeric:{rule:function(){return/^\d+$/},formatter:function(e){return e+" should contain only numbers."}},alphaNumeric:{rule:function(){return/^[a-z0-9]+$/i},formatter:function(e){return e+" should not contain special characters, please use only alphabets and numbers."}},alphabetic:{rule:function(){return/^[a-z]+$/i},formatter:function(e){return e+" should contain only alphabets."}},maxLength:{rule:function(e){return{test:function(r){return r.length<=e}}},formatter:function(e,r){return r?e+" can contain maximum "+r+" characters.":e+" contains more characters than expected."}},minLength:{rule:function(e){return{test:function(r){return r.length>=e}}},formatter:function(e,r){return r?e+" should contain minimum "+r+" characters.":e+" contains less characters than expected."}},phone:{rule:function(){return/^(\+|)(234|0)(7|8|9)(0|1)\d{8}$/},formatter:function(e){return e+" should contain valid phone number"}}},t=function(e){var r=e.value,t=e.values,a=e.checks,u=e.customValidator;if(a){var o=a.split("|");if(o.length)for(var l in o){var i=o[l],c=n[i],s="required"!==i&&!r||c.rule().test(r.toString());if(i.match(/nullable/)&&(!r||(null==r?void 0:r.constructor)===Array&&r.length<1))return!0;if(!s)return c.formatter.apply(null,[r])}}return"function"==typeof u&&u(r,t)},a=function(e,n){var a,u;switch(n.type){case"UPDATE_FIELD":return r(r({},e),{errors:r(r({},e.errors),(a={},a[n.payload.key]=t({key:n.payload.key,value:n.payload.value,values:e.values,checks:e.checks[n.payload.key],customValidator:e.validators[n.payload.key]}),a)),values:r(r({},e.values),(u={},u[n.payload.key]=n.payload.value,u))});default:return e}};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */module.exports=function(r){var n,u,o,l={checks:{},values:{},validators:{},errors:{}};for(var i in r)l.checks[i]=null===(n=r[i])||void 0===n?void 0:n.checks,l.validators[i]=null===(u=r[i])||void 0===u?void 0:u.validate,l.values[i]=null===(o=r[i])||void 0===o?void 0:o.value,l.errors[i]="";var c=e.useReducer(a,l),s=c[0],v=c[1],d=function(e){var r=e.key,n=e.value;if(void 0===s.values[r])throw Error('Field with key "'+r+'" not found, please make sure it is define in as follows:\n      useFormValidator({\n        '+r+': {\n          value: "",\n          checks: "required"\n        }\n      })\n      ');v({type:"UPDATE_FIELD",payload:{key:r,value:n}})};return{values:s.values,errors:s.errors,isAllFieldsValid:function(){var e=!0;for(var r in s.values){t({value:s.values[r],checks:s.checks[r]})&&(e=!1),v({type:"UPDATE_FIELD",payload:{key:r,value:s.values[r],checks:s.checks[r]}})}return e},isFieldValid:function(e){return d({key:e,value:s.values[e]}),!s.errors[e]},updateField:function(e){d({key:e.target.name,value:e.target.value})}}};
