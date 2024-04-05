import React from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

export default function TableHeading({
  name,
  sortable = true,
  sort_field = null,
  direction = null,
  sortBy = () => {},
  children
}) {
  return (
    <th onClick={(e) => sortBy(name)} scope="col" className="px-4 py-3">
      <div className="flex items-center gap-2 cursor-pointer">
        {children}
        {sortable && (
          <span className="flex flex-col gap-1 justify-end">
            <HiChevronUp
              className={
                'w-4 ' +
                (sort_field === name && direction === 'asc'
                  ? 'text-slate-900 dark:text-sky-500'
                  : 'text-slate-300 dark:text-slate-600')
              }
            />
            <HiChevronDown
              className={
                'w-4 -mt-2 ' +
                (sort_field === name && direction === 'desc'
                  ? 'text-slate-900 dark:text-sky-500'
                  : 'text-slate-300 dark:text-slate-600')
              }
            />
          </span>
        )}
      </div>
    </th>
  )
}
