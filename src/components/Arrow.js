import React from 'react';
import classNames from 'classnames';

const Arrow = ({
  isOpen,
  arrowClosed,
  arrowOpen,
  baseClassName,
  stateClassNames
}) => {
  const arrowClass = classNames({
    [`${baseClassName}-arrow`]: true,
    ...stateClassNames
  });

  const arrowIconClass = classNames({
    [`${baseClassName}-arrow-icon`]: true,
    ...stateClassNames
  });

  const arrow = isOpen ? arrowOpen : arrowClosed;

  return (
    <div data-testid="dropdown-arrow" className={arrowClass}>
      {arrowOpen && arrowClosed ? arrow : <span className={arrowIconClass} />}
    </div>
  );
};

export default Arrow;
