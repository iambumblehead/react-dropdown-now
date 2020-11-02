import React from 'react';
import classNames from 'classnames';

const Clear = ({
  clearIcon,
  stateClassNames,
  onClick,
  onMouseDown,
  onTouchEnd
}) => {
  const clearClass = classNames( 'rdn-control-clear', stateClassNames );
  const clearButtonClass = classNames( 'rdn-control-clear-button', stateClassNames );
  const clearButtonIconClass = classNames( 'rdn-control-clear-button-icon', stateClassNames );

  const clearButton = (
    <button
      data-testid="dropdown-clear-button"
      type="button"
      aria-label="clear"
      className={clearButtonClass}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onTouchEnd={onTouchEnd}
    >
      <span className={clearButtonIconClass} />
    </button>);

  return (
    <div data-testid="dropdown-clear" className={clearClass}>
      {clearIcon || clearButton}
    </div>
  );
};

export default Clear;
