import Link from 'next/link';
import Image from 'next/image';
import logoImg from '@/assets/logo.png';
import NavLink from '@/components/atoms/nav-link';
import MainHeaderBackground from './main-header-background';
import classes from './main-header.module.css';

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image
            src={logoImg.src}
            alt="food recipes task"
            width={100}
            height={100}
            priority
          />
          Next Level Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
