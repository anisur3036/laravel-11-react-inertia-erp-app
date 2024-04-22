import { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react'

export default forwardRef(function TextInput(
  {
    type = 'text',
    className = '',
    isFocused = false,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
  ref
) {
  const localRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus()
  }))

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus()
    }
  }, [])

  return (
    <input
      {...props}
      type={type}
      className={
        'dark:text-sky-300 border-gray-300 dark:bg-slate-800 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-slate-500 focus:ring-indigo-500 dark:focus:ring-slate-500 rounded-md shadow-sm ' +
        className
      }
      ref={localRef}
    />
  )
})
