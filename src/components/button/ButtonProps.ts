import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  Ref,
} from 'react'

export type ButtonVariant = 'fill' | 'outline' | 'text'

export type ButtonSize = 'S' | 'M' | 'L'

type BaseButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  children?: ReactNode
}

type AsButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button';
  ref?: Ref<HTMLButtonElement>
};

type AsLinkProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: 'a';
  ref?: Ref<HTMLAnchorElement>
};

export type ButtonProps = AsButtonProps | AsLinkProps;
