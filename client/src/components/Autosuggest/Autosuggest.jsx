import React, { useState, useMemo, useEffect } from 'react';
import ReactAutosuggest from 'react-autosuggest';

import './Autosuggest.css';

const noop = () => {};

export const Autosuggest = ({ onSelectStreet }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (e, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = useMemo(() => ({
    placeholder: 'Введите название улицы',
    value,
    onChange: onChange
  }), [onChange, value]);

  const renderInputComponent = (inputProps) => (
    <div className="inputContainer">
      <span className="icon" />
      <input {...inputProps} />
    </div>
  );
  
  return (
    <div className="autosuggest">
      <ReactAutosuggest
        inputProps={inputProps}
        suggestions={suggestions }
        onSuggestionsFetchRequested={noop}
        onSuggestionsClearRequested={noop}
        getSuggestionValue={onSelectStreet}
        renderSuggestion={noop}
        renderInputComponent={renderInputComponent}
      />
    </div>
  );
};
