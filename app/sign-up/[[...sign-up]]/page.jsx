'use client';
import { SignUp } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { light, dark } from '@clerk/themes';

const SignUpPage = () => {
  const { theme } = useTheme();
  return (
    <main className='mt-20 flex justify-center'>
      <SignUp
        appearance={{
          baseTheme: theme === 'light' ? light : dark,
          variables: {
            colorPrimary: 'hsl(30 100% 50%)',
            colorAlphaShade: 'hsl(30 100% 40%)',
          },
        }}
        redirectUrl='/'
      />
    </main>
  );
};

export default SignUpPage;
