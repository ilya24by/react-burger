export const COLORS = {
    MODAL_BG: '#1c1c21',
    ACCENT: '#4c4cff',
    ACTIVE: '#4c4cff',
    INPUT: '#2f2f37',
    SUCCESS: '#00cccc',
    ERROR: '#e52b1a',
    BG: '#131316',
    MODAL_EDGE: 'rgba(76, 76, 255, 0.2)',
    PRIMARY_LIGHT: '#f2f2f3',
    DARK_GREY: '#8585ad',
    DISABLED: '#3a3a55',
    BUTTON_NORMAL: 'linear-gradient(135deg, #801ab2 0%, #4c4cff 100%)',
    BUTTON_ACTIVE: 'linear-gradient(135deg, #4c4cff 0%, #801ab2 100%)',
} as const;

export const CSS_VARIABLES = {
    MODAL_BG: 'var(--modal-bg)',
    ACCENT: 'var(--accent)',
    ACTIVE: 'var(--active)',
    INPUT: 'var(--input)',
    SUCCESS: 'var(--success)',
    ERROR: 'var(--error)',
    BG: 'var(--bg)',
    MODAL_EDGE: 'var(--modal-edge)',
    PRIMARY_LIGHT: 'var(--primary-light)',
    DARK_GREY: 'var(--dark-grey)',
    DISABLED: 'var(--disabled)',
    BUTTON_NORMAL: 'var(--button-normal)',
    BUTTON_ACTIVE: 'var(--button-active)',
} as const;

export type ColorValue = typeof COLORS[keyof typeof COLORS];
export type CSSVariableValue = typeof CSS_VARIABLES[keyof typeof CSS_VARIABLES];
