import React from 'react'
import Link from 'next/link'
import Button from '@/components/Buttons/Button'

function CardInfo({ title, value, icon, button, children, padding, link }) {
  return (
    <div>
      <div className={` box mt-3 bg-white rounded  border-solid border-2 border-box relative lg:h-80  h-60 overflow-y-scroll ${padding}`}>
        <div>
          <div className="flex border-b-solid border-b-2 border-gray-200 justify-center sticky top-0 bg-white py-2">
          {icon}
          <div className="">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mt-2 ">{title}</p>
          </div>
          </div>
          <div className="text-center">
              {children} 
          </div>
        </div>
      </div>
      <div className="mt-3">
        { button ?
          ( <Link href= {link}>
              <Button className="text font-bold text-Black-text bg-white"> {button} </Button>
            </Link>
          ) : null 
        }
      </div>
    </div>
  )
}

export default CardInfo