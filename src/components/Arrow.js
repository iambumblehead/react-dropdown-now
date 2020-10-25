import React from 'react';
import classNames from 'classnames';

const Arrow = ({
  isOpen,
  arrowClosed,
  arrowOpen,
  baseClassName,
}) => {
  const arrowClass = classNames({
    [`${baseClassName}-arrow`]: true
  });

  const arrow = isOpen ? arrowOpen : arrowClosed;

  return (
    <div data-testid="dropdown-arrow" className={arrowClass}>
      {arrowOpen && arrowClosed ? arrow : <span className={`${arrowClass}-icon`} />}
    </div>
  );
};

export default Arrow;
