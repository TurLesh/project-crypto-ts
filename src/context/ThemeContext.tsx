import { createContext } from 'react';

interface IdefaultValue {
    currentTheme: string;
    changeCurrentTheme(newTheme: string): void; // (newTheme: string) - в скобках указывают (параметр: тип) которые принимает функция
} // : void - после скобок указывается тип который возвращает функция в результате

const defaultValue: IdefaultValue = {
    currentTheme: 'light',
    changeCurrentTheme: (newTheme: 'light' | 'dark') => {}
};

const ThemeContext = createContext(defaultValue);

export default ThemeContext;
