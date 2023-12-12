import { ModeToggle } from './ThemeToggler';
import { buttonVariants } from './ui/button';
import Link from 'next/link';
import { auth, UserButton, currentUser } from '@clerk/nextjs';
import User from './User';
const NavBar = async () => {
  const { userId } = auth();
  return (
    <nav className='fixed left-0 right-0 top-0 flex h-16 items-center justify-between bg-background px-5 z-50'>
      <Link href='/' className='text-lg font-bold text-primary'>
        DevUnite
      </Link>
      <div className='flex items-center gap-4'>
        {!userId ? (
          <>
            <Link
              href='/sign-in'
              className={buttonVariants({ variant: 'outline' })}
            >
              Sign In
            </Link>
            <Link
              href='/sign-up'
              className={buttonVariants({ variant: 'default' })}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
          <Link className={buttonVariants({ variant: "link" })} href='/profile'>Profile</Link>
          <Link className={buttonVariants({ variant: "link" })} href='/me'>Me</Link>
          <Link className={buttonVariants({ variant: "link" })} href='/new-post'>New Post</Link>
          <User />
          </>
        )}

        <ModeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
