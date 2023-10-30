'use client';
import black from '@/assets/icons/black.png';
import white from '@/assets/icons/white.png';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export const Logo = ({ size }: { size: number | `${number}` | undefined }) => {
  const { theme } = useTheme();
  return (
    <Image
      width={size}
      height={size}
      src={theme === 'dark' ? white : black}
      alt='CHATTER'
    />
  );
};
