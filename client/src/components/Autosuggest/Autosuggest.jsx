import React, { useState, useMemo, useCallback, useEffect } from 'react';
import ReactAutosuggest from 'react-autosuggest';
import debounce from 'lodash.debounce';

import { useContent } from '../../providers/ContentProvider';
import { getAddressContent } from '../../api/api';
import './Autosuggest.css';

const DEBOUNCE_INTERVAL = 500;
const SUGGESTIONS_COUNT = 3;

export const Autosuggest = ({}) => {
  const { updateContent, updateAddress, address } = useContent();
  const [value, setValue] = useState(address);
  const [suggestions, setSuggestions] = useState([]);
  const [isNoResults, setEmptyResult] = useState(false);

  useEffect(() => {
    setValue(address || '');
    setEmptyResult(false);
  }, [address]);

  const debouncedSuggestionsFetch = useMemo(
    () => debounce((value) => {
        getAddressContent(value, SUGGESTIONS_COUNT)
          .then((res) => {
            setSuggestions(res);
            setEmptyResult(!res.length);
          })
          .catch((e) => {
            setSuggestions([]);
            setEmptyResult(true);
          })
      }, DEBOUNCE_INTERVAL),
    [DEBOUNCE_INTERVAL]
  );

  const handleChange = (e, { newValue }) => {
    setValue(newValue);
  };

  const handleSelectValue = (suggestion) => {
    updateAddress(suggestion.name);
    updateContent(suggestion)
    return suggestion.name;
  };

  const handleClearSuggestions = () => {
    setSuggestions([]);
  };

  const handleFetchSuggestions = ({ value }) => {
    debouncedSuggestionsFetch(value);
  }; 

  const inputProps = useMemo(() => ({
    placeholder: 'Введите название улицы',
    value,
    onChange: handleChange
  }), [handleChange, value]);

  const renderInputComponent = useCallback(
    (inputProps) => (
      <div className="input__container">
        <span className="input__icon" />
        <input {...inputProps} />
      </div>
    ),
    []
  );

  const renderSuggestion = useCallback(
    (suggestion) => (
      <div className="item__container">
        <span className="item__icon" />
        <span>{suggestion.type} {suggestion.name}</span>
      </div>
    ),
    []
  );

  const renderSuggestionsContainer = ({ containerProps, children }) => {  
    return isNoResults
      ? <div className="no-results">Ничего не найдено по запросу</div>
      : (
        <div {...containerProps}>
          {children}
        </div>
      );
  }
  
  return (
    <div className="autosuggest">
      <ReactAutosuggest
        inputProps={inputProps}
        suggestions={suggestions}
        onSuggestionsFetchRequested={handleFetchSuggestions}
        onSuggestionsClearRequested={handleClearSuggestions}
        getSuggestionValue={handleSelectValue}
        renderSuggestion={renderSuggestion}
        renderInputComponent={renderInputComponent}
        renderSuggestionsContainer={renderSuggestionsContainer}
      />
    </div>
  );
};
