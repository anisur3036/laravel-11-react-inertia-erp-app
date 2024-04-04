import React from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

export default function TableHeading({ name }: { name: string }) {
  return (
    <th scope="col" className="px-4 py-3">
      <div className="flex items-center justify-between">
        <span>{name}</span>
        <span className="flex flex-col justify-end">
          <HiChevronUp className="w-4 cursor-pointer text-gray-400" />
          <HiChevronDown className="w-4 cursor-pointer text-gray-400" />
        </span>
      </div>
    </th>
  )
}
