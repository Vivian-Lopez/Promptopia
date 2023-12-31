"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
// import { Switch, useDarkreader } from 'react-darkreader';

const darkReaderOptions = { brightness: 100, contrast: 96, sepia: 0 };

export async function toggleDarkMode() {
   if (typeof window !== "undefined") {
      const { isEnabled, enable, disable, setFetchMethod } = await import("darkreader");
      setFetchMethod(window.fetch);
      const isOn = isEnabled();
      isOn ? disable() : enable(darkReaderOptions);
   }
}

const nav = () => {
  const { data: session } = useSession();
  
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  // const [isDark, { toggle }] = useDarkreader(true);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  })

  return (
    <nav className="flex-between w-full mb-16 pt-3 relative">
      
      {/*The following is a link with an image and text to go to the home page*/}
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
         />
         <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="gap-4 sm:flex hidden relative">
        {session?.user ? (
          <div className="flex gap-2 md:gap-5 target-element">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick= {signOut} className={"outline_btn"}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"/ >
            </Link>
          </div>
        ): (
          <>
            {providers &&
             Object.values(providers).map((provider) => (
              <button
               type="button" 
               key={provider.name} 
               onClick={()=>signIn(provider.id)}
               className='black_btn'
              >
                Sign In
              </button>
            ))}
          </>
        )}
        <button onClick={toggleDarkMode} className="flex-center">🌜</button>
        {/* <Switch checked={isDark} onChange={toggle} styling="docusaurus" className="absolute right-0 top-1.5"/> */}
      </div>

      {/* Mobile Navigation */}
      <div className="gap-4 sm:hidden flex relative">
        {session?.user ? (
          <div className="flex-center">
            <Image src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => {setToggleDropdown((prev) => !prev)}}
              />
              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}>
                      My Profile
                    </Link>
                    <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}>
                      Create Prompt
                    </Link>
                    <button
                      type="button"  
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut();
                      }}
                      className="mt-5 w-full black_btn"
                    >
                      Sign Out
                    </button>
                </div>
              )}
          </div>
        ): (
          <>
            {providers &&
             Object.values(providers).map((provider) => (
              <button
               type="button" 
               key={provider.name} 
               onClick={()=>signIn(provider.id)}
               className='black_btn'
              >
                Sign In
              </button>
            ))}
          </>
        )}
        <button onClick={toggleDarkMode} className="flex-center">🌜</button>
        {/* <Switch styling="docusaurus" className="absolute right-0 top-1.5"/> */}
      </div>
      
      {/*s{isDark ? '🌜' : '🌞'}*/}
    </nav>
  )
}

export default nav