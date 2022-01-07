import { Fragment, useState, useRef } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiCheck as CheckIcon, HiSelector as SelectorIcon, HiChevronDown } from 'react-icons/hi'

const status = [
  { name: ' Shipped ' },
  { name: ' On Hold ' },
  { name: ' Processing ' },
]

export const ListStatus = ({title}) => {
  const [selected, setSelected] = useState(false)
  return (
      <Listbox value={selected} onChange={setSelected}>
          <Listbox.Button className="text-sm relative cursor-default mx-auto flex  focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate font-bold text-sm">{ selected ? selected.name : title }</span>
            <span className="pointer-events-none">
              <HiChevronDown className="text-2xl" />
            </span>
          </Listbox.Button>
          <Transition
            show={true}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute right-5 mt-1 py-1 z-50  overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {status.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `${active ? 'text-orange bg-amber-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 px-5 `
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? 'text-amber-600' : 'text-amber-600'
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
      </Listbox>
  )
}