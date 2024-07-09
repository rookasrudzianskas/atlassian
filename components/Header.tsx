import React from 'react';
import Link from "next/link";

const Header = ({}) => {
  return (
    <header>
      <Link href={'/'}>
        <div>
          <h1>Assistly</h1>
          <h2 className={'text-sm'}>Your Customizable AI Chat Agent</h2>
        </div>
      </Link>
    </header>
  );
};

export default Header;
// by Rokas with ❤️
