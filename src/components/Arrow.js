import React from 'react';
import classNames from 'classnames';

const Arrow = ({
  isOpen,
  arrowClosed,
  arrowOpen,
  stateClassNames
}) => {
  const arrowClass = classNames( 'rdn-control-arrow', stateClassNames );
  const arrowIconClass = classNames( 'rdn-control-arrow-icon', stateClassNames );
  const arrow = isOpen ? arrowOpen : arrowClosed;

  return (
    <div data-testid="dropdown-arrow" className={arrowClass}>
      {arrowOpen && arrowClosed ? arrow : <span className={arrowIconClass} />}
    </div>
  );
};

export default Arrow;
