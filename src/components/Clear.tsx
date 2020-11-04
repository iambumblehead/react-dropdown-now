import React from 'react';
import classNames from 'classnames';

export interface ClearProps {
  clearIcon?: React.ReactNode;
  stateClassNames: Record<string, boolean>;
  onClick: (event: React.SyntheticEvent) => void;
  onMouseDown: (event: React.SyntheticEvent) => void;
  onTouchEnd: (event: React.SyntheticEvent) => void;
}

export const Clear: React.FC<ClearProps> = ({
  clearIcon,
  stateClassNames,
  onClick,
  onMouseDown,
  onTouchEnd,
}) => {
  const clearClass = classNames('rdn-control-clear', stateClassNames);
  const clearButtonClass = classNames(
    'rdn-control-clear-button',
    stateClassNames,
  );
  const clearButtonIconClass = classNames(
    'rdn-control-clear-button-icon',
    stateClassNames,
  );

  return (
    <div data-testid="dropdown-clear" className={clearClass}>
      <button
        data-testid="dropdown-clear-button"
        type="button"
        aria-label="clear"
        className={clearButtonClass}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onTouchEnd={onTouchEnd}
      >
        {clearIcon || <span className={clearButtonIconClass} />}
      </button>
    </div>
  );
};
