import type { ButtonHTMLAttributes } from 'react'

export type DatePickerSize = 'S' | 'M' | 'L'

export interface DatePickerProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'value' | 'defaultValue' | 'onChange' | 'children' | 'type'
  > {
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (date: Date | null) => void
  size?: DatePickerSize
  placeholder?: string
  min?: Date | null
  max?: Date | null
}
