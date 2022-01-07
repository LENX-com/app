import { Dialog, Transition } from '@headlessui/react'
import { useState, Fragment, useRef, useEffect } from 'react'
import { AiOutlineShoppingCart, AiOutlineClose, AiFillStar } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux'
import Button from '../../../components/Buttons/Button'
import { createAnswer } from '../../../actions/questionAction'
import { Desktop, Mobile } from '../../../ScreenSize'  

const AnswerPop = ({children, title, isOpen = false, setIsOpen }) => {
  const [answer, setAnswer ] = useState("")
  let completeButtonRef1 = useRef(null);
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <div>
        <div
            ref={completeButtonRef1}>
        </div>
      <Desktop>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 overflow-y-auto"
            style={{zIndex: '999'}} 
            onClose= { () => setIsOpen(false) }
            open= { isOpen }
            initialFocus={completeButtonRef1}
          >
            <div className="text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 blur-lg bg-background bg-opacity-70" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block align-bottom"
                aria-hidden="true"
              >
                &#8203;
              </span>
                          <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div
                      className={`fixed inset-0 m-auto  w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-background shadow-xl  overflow-y-scroll rounded-md h-96`}
                      >
                  <Dialog.Title
                    as="div"
                    className="border-b-2 border-Grey border-solid"
                  >
                    <div className="px-4 py-2 flex bg-white"> 
                    <h2 className="text-lg font-medium leading-6 text-gray-900 mt-2">{title} </h2>
                    <div onClick={ () => setIsOpen(false) } className="ml-auto text-xl text-white rounded-full p-2 bg-Black cursor-pointer">
                        <AiOutlineClose  />
                    </div> 
                    </div> 
                  </Dialog.Title>
                  <div className="p-3">
                      {children}
                  </div>
              </div>
              </Transition.Child>
              </div>
          </Dialog>
        </Transition>
      </Desktop>

      <Mobile>
                <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 overflow-y-auto"
            style={{zIndex: '999'}} 
            onClose= { () => setIsOpen(false) }
            open= { isOpen }
            initialFocus={completeButtonRef1}
          >
            <div className="text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 blur-lg bg-background bg-opacity-70" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block align-bottom"
                aria-hidden="true"
              >
                &#8203;
              </span>
                          <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div
                      className={`mobile:absolute mobile:bottom-0  w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-background shadow-xl  overflow-y-scroll`}
                      style= {{height:'60vh'}}
                      >
                  <Dialog.Title
                    as="div"
                    className="border-b-2 border-Grey border-solid"
                  >
                    <div className="px-4 py-2 flex bg-white"> 
                    <h2 className="text-lg font-medium leading-6 text-gray-900 mt-2">{title} </h2>
                    <div onClick={ () => setIsOpen(false) } className="ml-auto text-xl text-white rounded-full p-2 bg-Black">
                        <AiOutlineClose  />
                    </div> 
                    </div> 
                  </Dialog.Title>
                  <div className="p-3">
                      {children}
                  </div>
              </div>
              </Transition.Child>
              </div>
          </Dialog>
        </Transition>
      </Mobile>


    </div>
  )
}

export default AnswerPop