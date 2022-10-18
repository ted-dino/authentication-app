import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession();

  useEffect(() => setMounted(true), []);

  const themeSwitcher = () => {
    if (!mounted) return null;
    const currTheme = theme;

    if (currTheme === "dark") {
      return (
        <button onClick={() => setTheme("light")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        </button>
      );
    } else {
      return (
        <button onClick={() => setTheme("dark")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        </button>
      );
    }
  };

  return (
    <header className="flex items-center justify-between">
      <div className="logo grid place-content-center">
        <Image
          src={
            theme === "dark"
              ? "/devchallenges-light.svg"
              : "/devchallenges-dark.svg"
          }
          width={120}
          height={50}
        />
      </div>
      <nav className="w-full">
        <ul className="h-full flex gap-2 items-center justify-end">
          <li className="flex items-center">{themeSwitcher()}</li>
          {session && session.user && (
            <>
              <li
                onClick={() => setShowDropdown((prevState) => !prevState)}
                className="relative flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={session.user.image as string}
                  width={32}
                  height={36}
                  className="rounded-md"
                />
                <span className="hidden md:block">{session.user.name}</span>
                {showDropdown && (
                  <ul
                    className={`${
                      showDropdown ? "block" : "hidden"
                    } grid grid-cols-1 gap-2 absolute right-0 top-[40px] z-10 h-[174px] w-[188px] rounded-2xl pt-4 pl-5 pr-3 pb-3 border border-borderClr`}
                  >
                    <li className="p-2 flex items-center gap-2 hover:bg-[#f2f2f2] dark:hover:bg-[#c83929] rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>My Profile</span>
                    </li>
                    <li className="p-2 flex items-center gap-2 hover:bg-[#f2f2f2] dark:hover:bg-[#c83929] rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                          clipRule="evenodd"
                        />
                        <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                      </svg>
                      <span>Group Chat</span>
                    </li>
                    <hr />
                    <li className="p-2 flex items-center gap-2 hover:bg-[#f2f2f2] dark:hover:bg-[#c83929] rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <button
                        onClick={() =>
                          signOut({
                            callbackUrl: "/login",
                          })
                        }
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
