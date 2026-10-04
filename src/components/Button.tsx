import type { ButtonProps } from './ButtonProps'
import './Button.css'

export type { ButtonSize, ButtonVariant } from './ButtonProps'

function Button({
  variant = 'fill',
  size = 'M',
  className,
  disabled,
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
