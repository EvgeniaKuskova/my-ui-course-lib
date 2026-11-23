export type GridCell = Date | null;
export type GridWeek = GridCell[];

export function buildMonthWeeks(
    month: Date,
    firstDayOfWeek: number,
): GridWeek[] {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const first = new Date(year, monthIndex, 1);
    const leading = (first.getDay() - firstDayOfWeek + 7) % 7;
    const total = Math.ceil((leading + daysInMonth) / 7) * 7;

    const cells: GridCell[] = Array.from({ length: total }, (_, index) => {
        const day = index - leading + 1;
        return day >= 1 && day <= daysInMonth
            ? new Date(year, monthIndex, day)
            : null;
    });

    const rows: GridWeek[] = [];
    for (let index = 0; index < cells.length; index += 7) {
        rows.push(cells.slice(index, index + 7));
    }
    return rows;
}
