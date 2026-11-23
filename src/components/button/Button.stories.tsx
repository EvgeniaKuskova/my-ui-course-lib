
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import Button from './Button';

const meta = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],

    args: {
        children: 'Кнопка',
        variant: 'fill',
        size: 'M',
        disabled: false,
        onClick: fn(),
    },

    argTypes: {
        variant: {
            control: 'select',
            options: ['fill', 'outline', 'text'],
            description: 'Вариант оформления кнопки',
        },
        size: {
            control: 'radio',
            options: ['S', 'M', 'L'],
            description: 'Размер кнопки',
        },
        disabled: {
            control: 'boolean',
            description: 'Отключает кнопку',
        },
        onClick: {
            action: 'clicked',
            description: 'Обработчик нажатия',
        },
        children: {
            control: 'text',
            description: 'Текст кнопки',
        },
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Fill: Story = {
    args: {
        variant: 'fill',
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
    },
};

export const Text: Story = {
    args: {
        variant: 'text',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};
