// eslint-disable-next-line no-restricted-imports
import ReactSelect from 'react-select'; // the only spot this import is allowed

import { array, bool, oneOfType, string } from 'prop-types';
import {
  primary,
  rgbValuesPrimary,
  rgbValuesSecondary,
  successDeep,
  errorDeep,
} from 'common/styles/themeMap';

ThemedReactSelect.propTypes = {
  disabled: bool,
  hasErrors: bool,
  hasValidationStyling: bool,
  id: string,
  instanceId: string,
  isMulti: bool,
  isSearchable: bool,
  // TODO: Resolve why multiselects can end up with touched: { key: array }
  // see ThemedReactSelect as well
  // isTouched: bool,
  isTouched: oneOfType([array, bool]),
};

ThemedReactSelect.defaultProps = {
  disabled: false,
  hasErrors: false,
  hasValidationStyling: true,
  id: undefined,
  instanceId: undefined,
  isMulti: false,
  isSearchable: true,
  isTouched: false,
};

function ThemedReactSelect({
  disabled,
  hasErrors,
  hasValidationStyling,
  id,
  instanceId,
  isMulti,
  isSearchable,
  ...props
}) {
  // See TODO in propTypes definition
  // eslint-disable-next-line react/destructuring-assignment
  const isTouched = Array.isArray(props.isTouched) ? true : props.isTouched; // coerce to boolean

  const getOuterColor = () => {
    if (hasErrors) {
      return errorDeep;
    }

    return successDeep;
  };

  return (
    <ReactSelect
      {...props}
      instanceId={instanceId || id}
      disabled={disabled}
      closeMenuOnSelect={!isMulti}
      isMulti={isMulti}
      isSearchable={isSearchable}
      styles={{
        control: base => {
          return {
            ...base,
            borderColor:
              isTouched && hasValidationStyling
                ? getOuterColor()
                : `rgba(${rgbValuesSecondary}, 0.5)`,
            boxShadow:
              isTouched && hasValidationStyling ? `0 0 1px 1px ${getOuterColor()}` : 'none',
            fontSize: '1.125rem',
            marginTop: '0.25rem',
            marginBottom: '1rem',
            minWidth: '250px',
            padding: '0.25rem',
            opacity: disabled ? '0.5' : '1',
            outline: 'none',
            '&:hover': {
              cursor: disabled ? 'not-allowed' : 'text',
            },
          };
        },
        clearIndicator: base => {
          return {
            ...base,
            '&:hover': {
              cursor: disabled ? 'not-allowed' : 'pointer',
            },
          };
        },
        dropdownIndicator: base => {
          return {
            ...base,
            '&:hover': {
              cursor: disabled ? 'not-allowed' : 'pointer',
            },
          };
        },
        indicatorSeparator: base => {
          if (!isSearchable) return {};

          return base;
        },
        multiValueRemove: base => {
          return {
            ...base,
            '&:hover': {
              cursor: disabled ? 'not-allowed' : 'pointer',
            },
          };
        },
      }}
      theme={theme => {
        return {
          ...theme,
          borderRadius: 3,
          colors: {
            ...theme.colors,
            primary,
            primary75: `rgba(${rgbValuesPrimary}, 0.75)`,
            primary50: `rgba(${rgbValuesPrimary}, 0.50)`,
            primary25: `rgba(${rgbValuesPrimary}, 0.25)`,
          },
        };
      }}
    />
  );
}

export default ThemedReactSelect;
