'use client';
import { UserProfile } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { light, dark } from '@clerk/themes';
const Profile = () => {
    const {theme} = useTheme()
  return (
    <>
      <UserProfile
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

export default Profile;
