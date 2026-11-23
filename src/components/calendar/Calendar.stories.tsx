import {useState} from 'react';
import type { Meta } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Calendar } from './Calendar';
import { LocaleContext, ruRU } from './locale';
import { ThemeProvider } from '../theme_context/themeProvider';
import * as React from "react";

const onDateChange = fn().mockName('onDateChange');
const onMonthChange = fn().mockName('onMonthChange');

const meta = {
    title: 'Components/Calendar',
    component: Calendar,
    tags: ['autodocs'],

    parameters: {
        docs: {
            description: {
                component:
                    'Календарь с выбором даты, переключением месяцев, поддержкой локалей, тем и ограничением доступных дат.',
            },
        },
    },

    argTypes: {
        value: {
            control: 'date',
            description: 'Выбранная дата',
        },
        onValueChange: {
            description: 'Колбэк, вызываемый при выборе даты',
        },
        month: {
            control: 'date',
            description: 'Отображаемый месяц',
        },
        onMonthChange: {
            description: 'Колбэк при переключении месяца',
        },
        minDate: {
            control: 'date',
            description: 'Минимальная доступная дата',
        },
        maxDate: {
            control: 'date',
            description: 'Максимальная доступная дата',
        },
        isDateDisabled: {
            control: false,
            description: 'Функция проверки недоступности даты',
        },
        autoFocus: {
            control: 'boolean',
            description: 'Автоматический фокус на дне календаря',
        },
    },
} satisfies Meta<typeof Calendar>;

export default meta;

function CalendarExample() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        onDateChange(date);
    };
    return (
        <ThemeProvider theme="light">
            <LocaleContext.Provider value={ruRU}>
                <div style={{ width: 320 }}>
                    <Calendar
                        value={selectedDate}
                        onValueChange={handleDateChange}
                        onMonthChange={onMonthChange}
                        autoFocus
                    />

                    <p>
                        Выбранная дата:{' '}
                        {selectedDate
                            ? selectedDate.toLocaleDateString('ru-RU')
                            : 'Дата не выбрана'}
                    </p>
                </div>
            </LocaleContext.Provider>
        </ThemeProvider>
    );
}

export const Default: { render: () => React.JSX.Element } = {
    render: () => <CalendarExample />,
};

export const WithDisabledWeekends: { render: () => React.JSX.Element } = {
    render: () => {
        const [selectedDate, setSelectedDate] = useState<Date | null>(null);

        return (
            <ThemeProvider theme="light">
                <LocaleContext.Provider value={ruRU}>
                    <div style={{ width: 320 }}>
                        <Calendar
                            value={selectedDate}
                            onValueChange={(date) => {
                                setSelectedDate(date);
                                onDateChange(date);
                            }}
                            isDateDisabled={(date) =>
                                date.getDay() === 0 || date.getDay() === 6
                            }
                        />

                        <p>
                            Выбранная дата:{' '}
                            {selectedDate
                                ? selectedDate.toLocaleDateString('ru-RU')
                                : 'Дата не выбрана'}
                        </p>
                    </div>
                </LocaleContext.Provider>
            </ThemeProvider>
        );
    },
};
