import React from 'react';
import classNames from 'classnames';

export interface ArrowProps {
  isOpen: boolean;
  arrowClosed: React.ReactNode;
  arrowOpen: React.ReactNode;
  stateClassNames: Record<string, boolean>;
}

export const Arrow: React.FC<ArrowProps> = ({
  isOpen,
  arrowClosed,
  arrowOpen,
  stateClassNames,
}) => {
  const arrowClass = classNames('rdn-control-arrow', stateClassNames);
  const arrowIconClass = classNames('rdn-control-arrow-icon', stateClassNames);
  const arrow = isOpen ? arrowOpen : arrowClosed;

  return (
    <div data-testid="dropdown-arrow" className={arrowClass}>
      {arrowOpen && arrowClosed ? arrow : <span className={arrowIconClass} />}
    </div>
  );
};
