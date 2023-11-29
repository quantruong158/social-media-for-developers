'use client';
import { UserButton } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { light, dark } from '@clerk/themes';
const User = () => {
  const { theme } = useTheme();
  return (
    <>
      <UserButton
        afterSignOutUrl='/'
        appearance={{
          baseTheme: theme === 'light' ? light : dark,
          variables: {
            colorPrimary: 'hsl(30 100% 50%)',
            colorAlphaShade: 'hsl(30 100% 40%)',
          },
        }}
      />
    </>
  );
};

export default User;
