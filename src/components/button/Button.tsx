import type { ButtonProps } from './ButtonProps.ts'
import './Button.css'
import * as React from "react";

export type { ButtonSize, ButtonVariant } from './ButtonProps.ts'

function Button(props: ButtonProps) {
  const {
    variant = 'fill',
    size = 'M',
    className,
    children,
    as = 'button',
    ...rest
  } = props

  const classes = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  const Tag = as as React.ElementType;

  return (
    <Tag
      className={classes}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Button
