import React, { useEffect, useState } from 'react';
import { FormLabel, FormSubText } from './FormText';

export const FormInput = ({
  id = '', placeholder = '', value = '', onChange = '', label = '', required = false, subtext = '', type = 'text',
}) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (value !== content) {
      setContent(value);
    }
  }, [value]);

  const change = (e) => (onChange === '' ? setContent(e.target.value) : onChange(e.target.value));

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-3">
        { label !== '' && (
        <FormLabel
          className=""
          text={label}
          htmlFor={id}
        />
        )}
        {
          required && (
          <p className="mb-2 text-xs text-red-500">
            Required
          </p>
          )
      }
        {
            subtext !== '' && (
            <FormSubText
              text={subtext}
            />
            )
        }
        <div className="mt-1 flex rounded-md">
          <input
            type={type}
            id={id}
            className="form-input border border-gray-300 w-full focus:border-indigo-500"
            placeholder={placeholder}
            onChange={change}
            value={content}
          />
        </div>
      </div>
    </div>

  );
};
