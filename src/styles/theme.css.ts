import { createTheme } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
    font: {
        family: 'Inter, system-ui, sans-serif',
    },
    button: {
        borderColor: '#17171b',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '10px',
        minWidth: '140px',
        fill: {
            bg: '#17171b',
            bgHover: '#2d2d33',
            bgActive: '#050506',
            text: '#ffffff',
        },
        outline: {
            bg: '#ffffff',
            bgHover: '#f4f4f5',
            bgActive: '#e4e4e7',
            text: '#08060d',
        },
        textVariant: {
            color: '#17171b',
            bgHover: '#f4f4f5',
            bgActive: '#e7e7ea',
        },
        size: {
            S: { height: '36px', fontSize: '14px', padding: '16px' },
            M: { height: '44px', fontSize: '15px', padding: '16px' },
            L: { height: '52px', fontSize: '16px', padding: '16px' },
        }
    }
});
