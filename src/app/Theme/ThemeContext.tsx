// // // ThemeContext.tsx
// // import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
// // // import { getTheme, baseColors } from './theme';
// // import { baseColors, getTheme } from './ThemeComponent';
// // import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

// // type ThemeContextType = {
// //     themeMode: 'light' | 'dark';
// //     toggleThemeMode: () => void;
// //     currentColors: typeof baseColors;
// //     updateColors: (newColors: Partial<typeof baseColors>) => void;
// // };

// // const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// // export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// //     const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
// //     const [currentColors, setCurrentColors] = useState(baseColors);

// //     // Load saved theme settings from localStorage
// //     useEffect(() => {
// //         const savedMode = localStorage.getItem('themeMode');
// //         const savedColors = localStorage.getItem('themeColors');

// //         if (savedMode) setThemeMode(savedMode as 'light' | 'dark');
// //         if (savedColors) setCurrentColors(JSON.parse(savedColors));
// //     }, []);

// //     // Save theme settings to localStorage
// //     useEffect(() => {
// //         localStorage.setItem('themeMode', themeMode);
// //         localStorage.setItem('themeColors', JSON.stringify(currentColors));
// //     }, [themeMode, currentColors]);

// //     const toggleThemeMode = () => {
// //         setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
// //     };

// //     const updateColors = (newColors: Partial<typeof baseColors>) => {
// //         setCurrentColors((prev) => ({
// //             ...prev,
// //             ...newColors
// //         }));
// //     };

// //     const theme = useMemo(() => getTheme(themeMode, currentColors), [themeMode, currentColors]);

// //     return (
// //         <ThemeContext.Provider value={{ themeMode, toggleThemeMode, currentColors, updateColors }}>
// //             <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
// //         </ThemeContext.Provider>
// //     );
// // };

// // export const useThemeContext = () => {
// //     const context = useContext(ThemeContext);
// //     if (!context) {
// //         throw new Error('useThemeContext must be used within a ThemeProvider');
// //     }
// //     return context;
// // };
// // ThemeContext.tsx

'use client';
// import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
// import { getTheme, baseColors } from './ThemeComponent';
// import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

// type ThemeContextType = {
//     themeMode: 'light' | 'dark';
//     toggleThemeMode: () => void;
//     currentColors: typeof baseColors;
//     updateColors: (newColors: Partial<typeof baseColors>) => void;
// };

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
//     const [currentColors, setCurrentColors] = useState(baseColors);

//     // Load saved theme settings from localStorage
//     useEffect(() => {
//         const savedMode = localStorage.getItem('themeMode');
//         const savedColors = localStorage.getItem('themeColors');

//         if (savedMode) setThemeMode(savedMode as 'light' | 'dark');
//         if (savedColors) setCurrentColors(JSON.parse(savedColors));
//     }, []);

//     // Save theme settings to localStorage
//     useEffect(() => {
//         localStorage.setItem('themeMode', themeMode);
//         localStorage.setItem('themeColors', JSON.stringify(currentColors));
//     }, [themeMode, currentColors]);

//     const toggleThemeMode = () => {
//         setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//     };

//     const updateColors = (newColors: Partial<typeof baseColors>) => {
//         setCurrentColors((prev) => ({
//             ...prev,
//             ...newColors
//         }));
//     };

//     const theme = useMemo(() => getTheme(themeMode, currentColors), [themeMode, currentColors]);

//     return (
//         <ThemeContext.Provider value={{ themeMode, toggleThemeMode, currentColors, updateColors }}>
//             <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
//         </ThemeContext.Provider>
//     );
// };

// export const useThemeContext = () => {
//     const context = useContext(ThemeContext);
//     if (!context) {
//         throw new Error('useThemeContext must be used within a ThemeProvider');
//     }
//     return context;
// };
'use client';
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { getTheme, baseColors } from './ThemeComponent';

type ThemeContextType = {
    themeMode: 'light' | 'dark';
    toggleThemeMode: () => void;
    currentColors: typeof baseColors;
    updateColors: (newColors: Partial<typeof baseColors>) => void;
    resetColors: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
    const [currentColors, setCurrentColors] = useState(baseColors);

    // Load saved preferences
    useEffect(() => {
        const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
        const savedColors = localStorage.getItem('themeColors');

        if (savedMode) setThemeMode(savedMode);
        if (savedColors) setCurrentColors(JSON.parse(savedColors));
    }, []);

    // Save preferences
    useEffect(() => {
        localStorage.setItem('themeMode', themeMode);
        localStorage.setItem('themeColors', JSON.stringify(currentColors));
    }, [themeMode, currentColors]);

    const toggleThemeMode = () => {
        setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const updateColors = (newColors: Partial<typeof baseColors>) => {
        setCurrentColors((prev) => ({
            ...prev,
            ...newColors
        }));
    };

    const resetColors = () => {
        setCurrentColors(baseColors);
        localStorage.removeItem('themeMode');
        localStorage.removeItem('themeColors');
    };

    const theme = useMemo(() => getTheme(themeMode, currentColors), [themeMode, currentColors]);

    return (
        <ThemeContext.Provider value={{ themeMode, toggleThemeMode, currentColors, updateColors, resetColors }}>
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};
