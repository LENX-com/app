import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiCheck, HiOutlineSelector } from 'react-icons/hi'

const people = [
  { name: 'Where is my product' },
  { name: 'Contact manufacturer' },
  { name: 'Check reviews' },
]

export default function Questions() {
  const [selected, setSelected] = useState(people[0])

  return (
    <div className="z-50">
      <Listbox value={selected} onChange={setSelected}>
        <div className="absolute bottom-4 mt-1 mobile:left-4">
          <Listbox.Button className="relative py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate mr-4 text-Black">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <HiOutlineSelector
                className="w-5 h-5 text-lightBlack"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            show= {true}
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `${active ? 'text-Blue bg-amber-100' : 'text-Black'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate mr-4`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? 'text-Black' : 'text-Black'
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <HiCheck className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
