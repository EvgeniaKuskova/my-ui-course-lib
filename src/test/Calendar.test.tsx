import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {Calendar} from "../components/calendar/Calendar.tsx";
import {
    LocaleContext,
    ruRU,
} from '../components/calendar/locale.ts'
import {useState} from "react";

function ControlledCalendar({
                                onValueChange,
                            }: {
    onValueChange: (date: Date) => void;
}) {
    const [month, setMonth] = useState(new Date(2024, 10, 1));
    return (
        <LocaleContext.Provider value={ruRU}>
            <Calendar
                value={null}
                onValueChange={onValueChange}
                month={month}
                onMonthChange={setMonth}
            />
        </LocaleContext.Provider>
    );
}

describe('Calendar', () => {
    it('листает на декабрь и выбирает 15-е', async () => {
        const onValueChange = vi.fn();
        const user = userEvent.setup();

        render(<ControlledCalendar onValueChange={onValueChange} />);

        await user.click(
            screen.getByRole('button', { name: ruRU.messages.calendar.nextMonth }),
        );

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
            /декабрь 2024/i,
        );

        const day15 = screen.getByRole('button', { name: /15 декабря 2024/ });
        await user.click(day15);

        expect(onValueChange).toHaveBeenCalledTimes(1);
        const picked = onValueChange.mock.calls[0][0] as Date;
        expect(picked.getFullYear()).toBe(2024);
        expect(picked.getMonth()).toBe(11);
        expect(picked.getDate()).toBe(15);
    });
});
