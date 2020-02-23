import React from 'react';
import classNames from 'classnames';

import { BASE_DEFAULT_PROPS } from './constants';

const Arrow = props => {
  const {
    isOpen,
    arrowClassName,
    arrowClosed,
    arrowOpen,
    baseClassName
  } = props;

  const arrowClass = classNames({
    [`${baseClassName}-arrow`]: true,
    [arrowClassName]: !!arrowClassName,
  });
  
  const arrow = isOpen ? arrowOpen : arrowClosed;
  
  return (
    <div className={`${baseClassName}-arrow-wrapper`}>
      {arrowOpen && arrowClosed ? arrow : <span className={arrowClass} />}
    </div>
  );
};

Arrow.defaultProps = {
  ...BASE_DEFAULT_PROPS
};

export default Arrow;
