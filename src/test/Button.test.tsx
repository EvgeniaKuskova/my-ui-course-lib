import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {Button} from "../index.ts";


describe('Button', () => {
    it('вызывает onClick при клике', async () => {
        const onClick = vi.fn();
        const user = userEvent.setup();

        render(<Button onClick={onClick}>Кнопка</Button>);

        await user.click(screen.getByRole('button', { name: 'Кнопка' }));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('не вызывает onClick, если disabled', async () => {
        const onClick = vi.fn();
        const user = userEvent.setup();

        render(
            <Button onClick={onClick} disabled>
                Кнопка
            </Button>,
        );

        await user.click(screen.getByRole('button', { name: 'Кнопка' }));

        expect(onClick).not.toHaveBeenCalled();
    });
});
