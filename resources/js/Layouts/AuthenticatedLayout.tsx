import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { RiBuilding3Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import SubMenu from "@/Components/SubMenu";

export default function Authenticated({
  user,
  header,
  children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const closeSidebarMenu = () => {
    setIsSidebarActive(false);
  };

  const subMenusList = [
    {
      name: "build",
      icon: RiBuilding3Line,
      menus: [
        {
          id: 1,
          name: "ABC",
          url: "/dashboard",
          menuRoute: "dashboard",
        },
        {
          id: 2,
          name: "Auth",
          url: "/auths",
          menuRoute: "auth",
        },
        {
          id: 3,
          name: "Packagess",
          url: "/packagess",
          menuRoute: "packages",
        },
      ],
    },
    {
      name: "analytics",
      icon: TbReportAnalytics,
      menus: [
        {
          id: 1,
          name: "Profile",
          url: "/profile",
          nameRoute: "profile.t",
        },
        {
          id: 2,
          name: "Auth",
          url: "/auth",
          nameRoute: "auth",
        },
        {
          id: 3,
          name: "Packages",
          url: "/packages",
          nameRoute: "packages",
        },
      ],
    },
  ];

  return (
    <>
      <div
        id="sidebar"
        className={isSidebarActive ? "sidebar active" : "sidebar"}
      >
        <div
          id="brand"
          className="fixed sm:left-0 h-14 top-0 w-64 py-4 pr-0 pl-4 text-white shadow"
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center font-bold">
              <ApplicationLogo className="block h-9 w-auto" />
              <h2 className="pl-2 text-2xl">SKCL</h2>
            </Link>
            <button
              onClick={closeSidebarMenu}
              className="close-btn sm:hidden cursor-pointer mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <nav
          id="sidebar-menu"
          className="mt-14 py-2 mb-8 overflow-y-scroll h-screen pb-14"
        >
          <section className="px-4">
            <small className="pl-3 text-slate-500 inline-block mb-2">
              Menu
            </small>
          </section>
          <section className="flex flex-col h-full">
            <ul className="whitespace-pre px-2.5 text[0.9rem] py-5 flex flex-col gap-1 font-medium">
              <li>
                <Link href="/" className={"link text-gray-100"}>
                  <AiOutlineAppstore
                    size={23}
                    className="text-gray-100 min-w-max"
                  />
                  All Apps
                </Link>
              </li>
              <li>
                <Link href="/" className={"link text-gray-100"}>
                  <BsPerson size={23} className="text-gray-100 min-w-max" />
                  Authentication
                </Link>
              </li>

              <div className="">
                <small className="pl-3 text-slate-500 inline-block mb-2">
                  Product categories
                </small>
                {subMenusList?.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1">
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
              <li>
                <Link href="/" className={"link text-gray-100"}>
                  <HiOutlineDatabase
                    size={23}
                    className="text-gray-100 min-w-max"
                  />
                  Storage
                </Link>
              </li>
            </ul>
          </section>
        </nav>
      </div>
      <div
        id="main-container"
        className={isSidebarActive ? "main-container active" : "main-container"}
      >
        <header className="flex items-center justify-between fixed left-0 h-14 sm:left-64 bg-white w-full sm:w-[calc(100%-256px)] top-0 z-50 p-2 shadow">
          <div className="flex items-center">
            <button
              onClick={() =>
                setIsSidebarActive((previousState) => !previousState)
              }
              className="menu-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <span>Welcome</span>
          </div>
          <div className="relative flex items-center sm:w-[400px]">
            {/* <MagnifyingGlassIcon
          className="w-5 h-5 absolute left-[8px] text-gray-400"
        /> */}
            <input
              className="pl-8 w-full py-1 rounded-full border-gray-300 focus:ring-1 focus:ring-gray-50"
              type="text"
              name="search"
              placeholder="Search..."
            />
          </div>
          <div className="ml-3 relative">
            <Dropdown>
              <Dropdown.Trigger>
                <span className="inline-flex rounded-md">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                  >
                    {user.name}

                    <svg
                      className="ms-2 -me-0.5 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              </Dropdown.Trigger>

              <Dropdown.Content>
                <Dropdown.Link href={route("profile.edit")}>
                  Profile
                </Dropdown.Link>
                <Dropdown.Link href={route("logout")} method="post" as="button">
                  Log Out
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </header>
        <main className="mt-14 min-h-[calc(100vh)] bg-gray-100">
          {children}
        </main>
      </div>
    </>
  );
}
