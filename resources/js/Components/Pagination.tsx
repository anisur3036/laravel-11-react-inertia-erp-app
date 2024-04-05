import { Link } from '@inertiajs/react'
export default function Pagination({ links }) {
  return (
    <>
      {links.map((link, index) => (
        <Link
          preserveScroll
          href={link.url}
          key={index}
          className={
            'inline-block py-1 px-2 rounded text-slate-900 dark:text-sky-300 text-xs ' +
            (link.active
              ? 'border border-slate-400 dark:border-slate-900 text-slate-900 dark:text-sky-200 '
              : '') +
            (!link.url
              ? '!text-slate-500 cursor-not-allowed '
              : 'hover:text-slate-900 dark:hover:text-sky-500')
          }
          dangerouslySetInnerHTML={{ __html: link.label }}
        ></Link>
      ))}
    </>
  )
}
