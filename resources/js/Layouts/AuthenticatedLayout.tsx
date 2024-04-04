import { PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import ApplicationLogo from '@/Components/ApplicationLogo'
import Dropdown from '@/Components/Dropdown'
import { Link } from '@inertiajs/react'
import { User } from '@/types'
import { AiOutlineAppstore } from 'react-icons/ai'
import { BsPerson } from 'react-icons/bs'
import { HiOutlineDatabase } from 'react-icons/hi'
import { RiBuilding3Line } from 'react-icons/ri'
import { TbReportAnalytics } from 'react-icons/tb'
import SubMenu from '@/Components/SubMenu'
import { MagnifyingGlassIcon, MoonIcon, SunIcon } from '@heroicons/react/16/solid'
import { IoMoon, IoSunny } from 'react-icons/io5'
import { IoIosDesktop } from 'react-icons/io'

export default function Authenticated({
  user,
  header,
  children
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
  const [isSidebarActive, setIsSidebarActive] = useState(false)
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'system'
  )
  const element = document.documentElement
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

  function onWindowMatch() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && darkQuery.matches)) {
      element.classList.add('dark')
    } else {
      element.classList.remove('dark')
    }
  }
  onWindowMatch()
  useEffect(() => {
    switch (theme) {
      case 'dark':
        element.classList.add('dark')
        localStorage.setItem('theme', 'dark')
        break
      case 'light':
        element.classList.remove('dark')
        localStorage.setItem('theme', 'light')
        break
      default:
        localStorage.removeItem('theme')
        onWindowMatch()
        break
    }
  }, [theme])

  const closeSidebarMenu = () => {
    setIsSidebarActive(false)
  }

  const subMenusList = [
    {
      name: 'Masters',
      icon: RiBuilding3Line,
      menus: [
        {
          id: 1,
          name: 'Colors',
          url: 'color.index',
          menuRoute: 'color.index'
        }
      ]
    },
    {
      name: 'analytics',
      icon: TbReportAnalytics,
      menus: [
        {
          id: 1,
          name: 'Profile',
          url: 'dashboard',
          nameRoute: 'dashboard'
        }
      ]
    }
  ]

  return (
    <>
      <div id="sidebar" className={isSidebarActive ? 'sidebar active' : 'sidebar'}>
        <div
          id="brand"
          className="fixed sm:left-0 h-14 top-0 w-64 py-4 pr-0 pl-4 text-white border-b border-slate-900/10 dark:border-slate-300/10"
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center font-bold">
              <ApplicationLogo className="block h-8 w-auto text-slate-100 dark:text-slate-200" />
              <h2 className="pl-2 text-2xl text-slate-200">SKCL</h2>
            </Link>
            <button onClick={closeSidebarMenu} className="close-btn sm:hidden cursor-pointer mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <nav id="sidebar-menu" className="mt-14 py-2 mb-8 overflow-y-scroll h-screen pb-14">
          <section className="px-4">
            <small className="pl-3 text-slate-500 inline-block mb-2">Menu</small>
          </section>
          <section className="flex flex-col h-full">
            <ul className="whitespace-pre px-2.5 text[0.9rem] py-5 flex flex-col gap-1 font-medium">
              <li>
                <Link href="/" className={'link text-gray-100 dark:text-slate-400'}>
                  <AiOutlineAppstore
                    size={23}
                    className="text-gray-100 dark:text-slate-400 min-w-max"
                  />
                  All Apps
                </Link>
              </li>
              <li>
                <Link href="/" className={'link text-gray-100 dark:text-slate-400'}>
                  <BsPerson size={23} className="text-gray-100 dark:text-slate-400 min-w-max" />
                  Authentication
                </Link>
              </li>

              <div className="">
                <small className="pl-3 text-slate-500 inline-block mb-2">Product categories</small>
                {subMenusList?.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1">
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
              <li>
                <Link href="/" className={'link text-gray-100 dark:text-slate-400'}>
                  <HiOutlineDatabase
                    size={23}
                    className="text-gray-100 dark:text-slate-400 min-w-max"
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
        className={isSidebarActive ? 'main-container active' : 'main-container'}
      >
        <header
          className="flex items-center justify-between fixed left-0 h-14
            border-b border-slate-900/10 dark:border-slate-300/10
            text-slate-700 dark:text-slate-200 sm:left-64 bg-white dark:bg-slate-900/75 w-full
            sm:w-[calc(100%-256px)] top-0 z-50 p-2 shadow"
        >
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarActive((previousState) => !previousState)}
              className="menu-btn flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <span className="pl-2.5">Welcome</span>
          </div>
          <div className="relative flex items-center sm:w-[400px]">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-[8px] text-gray-400 dark:text-slate-500" />
            <input
              className="pl-8 w-full py-1 dark:bg-slate-800 dark:text-sky-300 rounded-full border-slate-300 dark:border-sky-400/60 focus:ring-1 focus:ring-slate-300 focus:border-slate-400 dark:focus:ring-sky-500 dark:placeholder-sky-200"
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
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-slate-400  bg-white dark:bg-slate-900/75 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
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
                <div className="px-4 py-4 flex items-center duration-100 gap-4">
                  <button onClick={() => setTheme('light')}>
                    <IoSunny
                      className={`w-4 ${theme === 'light' ? 'text-red-500' : 'text-slate-400'}`}
                    />
                  </button>
                  <button onClick={() => setTheme('dark')}>
                    <IoMoon
                      className={`w-4 ${theme === 'dark' ? 'text-red-500' : 'text-slate-400'}`}
                    />
                  </button>
                  <button onClick={() => setTheme('system')}>
                    <IoIosDesktop
                      className={`w-4 ${theme === 'system' ? 'text-red-500' : 'text-slate-400'}`}
                    />
                  </button>
                </div>
                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                <Dropdown.Link href={route('logout')} method="post" as="button">
                  Log Out
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </header>
        <main className="min-h-[calc(100vh)] pt-20 pb-4">{children}</main>
      </div>
    </>
  )
}
