'use client';
import React from 'react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const Icon = isDark ? Moon : Sun;
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle Theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <Icon className="h-5" />
    </Button>
  );
}

export default React.memo(ThemeButton);
