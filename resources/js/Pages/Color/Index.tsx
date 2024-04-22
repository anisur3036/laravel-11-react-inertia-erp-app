// @ts-nocheck
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router, useForm } from '@inertiajs/react'
import { HiPencil, HiSearch, HiTrash } from 'react-icons/hi'
import { useState, FormEventHandler } from 'react'
import TableHeading from '@/Components/TableHeading'
import Pagination from '@/Components/Pagination'
import Modal from '@/Components/Modal'
import PrimaryButton from '@/Components/PrimaryButton'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import SecondaryButton from '@/Components/SecondaryButton'
import InputError from '@/Components/InputError'

export default function Index({ auth, colors, queryParams = {} }) {
  const [showDropdownActionBtn, setShowDropdownActionBtn] = useState(false)

  //data table functionality
  queryParams = queryParams || {}

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
      queryParams['page'] = 1
    } else {
      delete queryParams[name]
    }

    router.get(route('colors.index'), queryParams)
  }

  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return
    searchFieldChanged(name, e.target.value)
  }

  const sortBy = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.direction === 'asc') {
        queryParams.direction = 'desc'
      } else {
        queryParams.direction = 'asc'
      }
    } else {
      queryParams.sort_field = name
      queryParams.direction = 'asc'
    }
    router.get(route('colors.index'), queryParams)
  }

  // from processing
  const [formMode, setFormMode] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [colorId, setColorId] = useState(null)
  const [defaultColorData, setDefaultColorData] = useState({})

  const { data, setData, post, put, processing, errors, reset } = useForm({
    name: defaultColorData.name || ''
  })

  const createUser = () => {
    setShowModal(true)
    setFormMode('Create')
    setColorId(null)
    setDefaultColorData({})
  }

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    if (formMode === 'Create') {
      post(route('colors.store'), {
        onSuccess: () => {
          reset()
          setShowModal(false)
        }
      })
    } else {
      put(route('colors.update', defaultColorData.id), {
        onSuccess: () => {
          reset()
          setShowModal(false)
        }
      })
    }
  }

  const updateUser = (color) => {
    setShowModal(true)
    setFormMode('Update')
    setColorId(color.id)
    setDefaultColorData(color)
  }

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
                      <div className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">
                          Search
                        </label>
                        <div className="relative w-full">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <HiSearch className="w-5 h-5 text-sky-100" />
                          </div>
                          <input
                            type="text"
                            id="simple-search"
                            onBlur={(e) => searchFieldChanged('name', e.target.value)}
                            onKeyUp={(e) => onKeyPress('name', e)}
                            defaultValue={queryParams.name}
                            className="bg-slate-50 border border-slate-300 text-sky-300 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full pl-10 p-2 dark:bg-slate-800 dark:border-slate-600 dark:placeholder-slate-400 dark:text-sky-300 dark:focus:ring-slate-500 dark:focus:border-slate-500"
                            placeholder="Search"
                          />
                        </div>
                      </div>
                    </div>
                    <PrimaryButton onClick={createUser}>New</PrimaryButton>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-800 dark:text-sky-600">
                      <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 border-b dark:border-slate-800 dark:text-sky-300">
                        <tr>
                          <TableHeading
                            name="name"
                            sort_field={queryParams.sort_field}
                            direction={queryParams.direction}
                            sortBy={sortBy}
                          >
                            Name
                          </TableHeading>
                          <TableHeading
                            name="user"
                            sort_field={queryParams.sort_field}
                            direction={queryParams.direction}
                            sortBy={sortBy}
                          >
                            Created by
                          </TableHeading>
                          <TableHeading
                            name="created_at"
                            sort_field={queryParams.sort_field}
                            direction={queryParams.direction}
                            sortBy={sortBy}
                          >
                            Created at
                          </TableHeading>
                          <th scope="col" className="px-4 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {colors.data.map((color) => (
                          <tr key={color.id} className="border-b dark:border-slate-800">
                            <th scope="row" className="px-4 py-3 font-medium whitespace-nowra">
                              {color.name}
                            </th>
                            <td className="px-4 py-3">{color.user.name}</td>
                            <td className="px-4 py-3">{color.created_at}</td>
                            <td className="px-4 py-3 flex items-center justify-end">
                              <div className="flex items-center gap-4">
                                <button onClick={() => updateUser(color)}>
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
                    className="flex flex-row justify-end md:justify-center items-center md:items-center space-y-3 md:space-y-0 p-4"
                    aria-label="Table navigation"
                  >
                    <Pagination links={colors.meta.links} />
                  </nav>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      {/* modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="dark:bg-slate-900 p-4 rounded-lg w-full">
          <h2 className="py-4">{formMode === 'Create' ? 'Create Color' : `Update color`}</h2>
          <form onSubmit={submit} className="my-4">
            <div className="grid grid-cols-3 gap-4">
              <InputLabel
                htmlFor="name"
                className="col-span-1 dark:text-sky-300"
                value="Color name"
              />
              <div className="col-span-2 flex flex-col gap-2">
                <TextInput
                  type="text"
                  id="name"
                  value={data.name}
                  className="w-full dark:bg-slate-700"
                  onChange={(e) => setData('name', e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end gap-4">
              <SecondaryButton onClick={() => setShowModal(false)}>Cancel</SecondaryButton>
              <PrimaryButton disabled={processing} className={processing && 'bg-gray-400'}>
                Save
              </PrimaryButton>
            </div>
          </form>
        </div>
      </Modal>
    </AuthenticatedLayout>
  )
}
