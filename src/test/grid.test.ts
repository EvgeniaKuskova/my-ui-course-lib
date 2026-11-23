import { describe, it, expect } from 'vitest';
import {buildMonthWeeks} from "../components/calendar/grid.ts";


const countDays = (weeks: (Date | null)[][]) =>
    weeks.flat().filter((d): d is Date => d !== null).length;

describe('buildMonthWeeks', () => {
    it('обычный февраль 2025 — 28 дней', () => {
        const weeks = buildMonthWeeks(new Date(2025, 1, 1), 1);
        expect(countDays(weeks)).toBe(28);
    });

    it('високосный февраль 2024 — 29 дней', () => {
        const weeks = buildMonthWeeks(new Date(2024, 1, 1), 1);
        expect(countDays(weeks)).toBe(29);
    });

    it('март 2025 — в первой строке есть пустые ячейки перед 1-м числом', () => {
        const weeks = buildMonthWeeks(new Date(2025, 2, 1), 1);
        const firstRow = weeks[0];

        expect(firstRow).toHaveLength(7);
        for (let i = 0; i < 5; i += 1) {
            expect(firstRow[i]).toBeNull();
        }
        expect(firstRow[5]).toBeInstanceOf(Date);
        expect((firstRow[5] as Date).getDate()).toBe(1);
        expect((firstRow[5] as Date).getMonth()).toBe(2);
        expect((firstRow[6] as Date).getDate()).toBe(2);
    });

    it('все строки по 7 ячеек', () => {
        for (const month of [0, 1, 5, 11]) {
            buildMonthWeeks(new Date(2024, month, 1), 1).forEach((row) =>
                expect(row).toHaveLength(7),
            );
        }
    });
});
