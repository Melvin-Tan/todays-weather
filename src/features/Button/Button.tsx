import React, { ReactNode, useContext } from 'react';
import { Themes } from '../Themes/Themes';
import { ThemeContext } from '../Themes/ThemeContext';
import './Button.css';

export interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

export const Button = ({ children, className, onClick }: ButtonProps) => {
  const theme = useContext<Themes>(ThemeContext);

  return (
    <button
      className={`Button Button-${Themes[theme]} ${className ?? ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
