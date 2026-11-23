import * as React from "react";
import type { ButtonProps } from './ButtonProps.ts';
import { base, variant, size } from './Button.css.ts';

export type { ButtonSize, ButtonVariant } from './ButtonProps.ts';

function Button(props: ButtonProps) {
  const {
    variant: btnVariant = 'fill',
    size: btnSize = 'M',
    className,
    children,
    as = 'button',
    ...rest
  } = props;

  const classes = [
    base,
    variant[btnVariant],
    size[btnSize],
    className ?? '',
  ]
      .filter(Boolean)
      .join(' ');

  const Tag = as as React.ElementType;

  return (
      <Tag
          className={classes}
          {...rest}
      >
        {children}
      </Tag>
  );
}

export default Button;
