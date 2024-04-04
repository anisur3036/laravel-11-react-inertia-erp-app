import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Dropdown from '@/Components/Dropdown'
import { Head } from '@inertiajs/react'
import {
  HiArrowDown,
  HiArrowUp,
  HiChevronDown,
  HiChevronUp,
  HiDotsHorizontal,
  HiPencil,
  HiTrash
} from 'react-icons/hi'
import { useState } from 'react'
import { PageProps } from '@/types'
import TableHeading from '@/Components/TableHeading'

export default function Dashboard({ auth, colors }: PageProps) {
  const [showDropdownActionBtn, setShowDropdownActionBtn] = useState(false)
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Color" />

      <div className="">
        <div className="max-w-7xl mx-auto sm:px-4 lg:px-6">
          <div className="overflow-hidden shadow-sm sm:rounded-lg">
            <section className="">
              <div className="mx-auto max-w-screen-xl px-4 lg:px-8">
                {/* Start coding here */}
                <div className="bg-white dark:bg-slate-900 dark:border dark:border-slate-800 relative shadow-md sm:rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                      <form className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">
                          Search
                        </label>
                        <div className="relative w-full">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 text-slate-500 dark:text-slate-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="simple-search"
                            className="bg-slate-50 border border-slate-300 text-sky-300 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full pl-10 p-2 dark:bg-slate-800 dark:border-slate-600 dark:placeholder-slate-400 dark:text-sky-300 dark:focus:ring-slate-500 dark:focus:border-slate-500"
                            placeholder="Search"
                            required
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-800 dark:text-sky-300">
                      <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 border-b dark:border-slate-800 dark:text-sky-200">
                        <tr>
                          <TableHeading name="Name" />
                          <TableHeading name="Category" />
                          <TableHeading name="Brand" />
                          <TableHeading name="Description" />
                          <th scope="col" className="px-4 py-3">
                            Price
                          </th>
                          <th scope="col" className="px-4 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from([1, 2, 3, 4, 5, 6]).map((item) => (
                          <tr className="border-b dark:border-slate-800">
                            <th
                              scope="row"
                              className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap dark:text-sky-100"
                            >
                              Apple iMac 27"
                            </th>
                            <td className="px-4 py-3">PC</td>
                            <td className="px-4 py-3">Apple</td>
                            <td className="px-4 py-3">300</td>
                            <td className="px-4 py-3">$2999</td>
                            <td className="px-4 py-3 flex items-center justify-end">
                              <div className="flex items-center gap-4">
                                <button>
                                  <HiPencil className="w-6 text-slate-500 dark:text-sky-300" />
                                </button>
                                <button>
                                  <HiTrash className="w-6 text-red-400" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <nav
                    className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                    aria-label="Table navigation"
                  >
                    <span className="text-sm font-normal text-gray-500 dark:text-sky-200/75">
                      Showing
                      <span className="font-semibold text-gray-900 dark:text-sky-200/75">1-10</span>
                      of
                      <span className="font-semibold text-gray-900 dark:text-sky-200/75">1000</span>
                    </span>
                    <ul className="inline-flex items-stretch -space-x-px">
                      <li>A
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
