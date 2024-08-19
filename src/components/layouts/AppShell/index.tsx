import React from "react";
import { Inter, Montserrat } from "next/font/google";
import Menu from "../Menu";
import Link from "next/link";
import SearchPage from "@/components/Search";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

type AppShellProps = { children: React.ReactNode };

const AppShell = (props: AppShellProps) => {
  const { children } = props;

  return (
    <>
      <div className="navbar bg-gradient-to-r from-purple-950 to-orange-700">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {/* <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li> */}
            </ul>
          </div>
          <Link
            className={`btn btn-ghost text-xl text-white ${montserrat.className}`}
            href="/"
          >
            Dokumentasi SIM KOKEK
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {/* <li><a>Item 1</a></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
      <li><a>Item 3</a></li> */}
          </ul>
        </div>
        <div className="navbar-end">
          <SearchPage />
        </div>
      </div>
      {/* <div className="navbar bg-neutral text-neutral-content">
        <Link href="/">
          <button className="btn btn-ghost text-xl">
            Dokumentasi SurveiKu
          </button>
        </Link>
      </div> */}
      <div className="container mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-0 md:gap-12 min-h-screen py-10">
          <div className="top-0 col-span-2 p-5">
            <div>
              <Menu />
            </div>
          </div>
          {children}
          {/* <div className={`col-span-4 bg-white ${inter.className}`}>
            {children}
          </div>
          <div className="self-start sticky top-10 col-span-2 ">
            <h3 className={`text-xl font-bold mb-10 ${inter.className}`}>
              Di halaman ini
            </h3>
            <div></div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AppShell;
