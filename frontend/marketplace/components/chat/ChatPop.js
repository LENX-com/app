import { Dialog, Transition } from '@headlessui/react'
import { useState, Fragment, useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Button from '../../../components/Buttons/Button'
import { AiFillWechat, AiFillSecurityScan } from "react-icons/ai";
import Avatar from '../../../components/Avatar/Avatar'

const FilterDialogue = () => {
  let [isOpen, setIsOpen] = useState(false)
  let completeButtonRef = useRef(null)
  const [ manufacturer, setManufacturer ] = useState({
      state:false,  
      name:"pedro",
  });

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
 

  return (
    <div>
        <div className="my-2"
            ref={completeButtonRef}>
            <Button
                onClick={openModal} 
                className="bg-Blue text-white flex">
                <AiFillWechat className="my-auto text-lg mr-2"/>
                    Chat now
            </Button>
        </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto"
          style={{zIndex: '999'}} 
          onClose= { () => setIsOpen(false) }
          open= { isOpen }
          initialFocus={completeButtonRef}
        >
          <div className="min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 blur-lg bg-white bg-opacity-70" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-bottom"
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
                    className="absolute bottom-0 w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-t-xl overflow-y-scroll"
                    style= {{height:'100vh'}}
                    >
                <Dialog.Title
                  as="div"
                  className="border-b-2 border-Grey border-solid"
                >
                  <div className="px-4 py-2 flex bg-Grey"> 
                  <h2 className="text-lg font-medium leading-6 text-gray-900 mt-2"> Contact Manufacturer </h2>
                  <div onClick={ () => setIsOpen(false) } className="ml-auto text-xl text-white rounded-full p-2 bg-Black">
                      <AiOutlineClose  />
                  </div> 
                  </div> 
                </Dialog.Title>
                <div className="mt-3">
                    <div className="p-3">
                        <div className="p-2 rounded-lg bg-orange-light flex mt-1 mb-4 mr-3">
                            <AiFillSecurityScan className="my-auto text-xl text-white h-10 w-10" />
                            <h1 className="text-sm text-white ml-2">To protect your orders，always communicate and pay through the LENX website. </h1>
                        </div>
                        <div className="my-3 text-sm"
                            onClick ={(() => setManufacturer({
                                            state: true,
                                            name: "Pedro"
                            }))}>
                            <Avatar src="https://avatars3.githubusercontent.com/u/11801238?v=4"/>
                            Pedro Rondale
                        </div>
                        { manufacturer.state &&
                        <div className="mt-4 mb-2">
                            {`Contact ${manufacturer.name}`}
                        </div>
                        }
                        <div>
                            <input className="shadow appearance-none border rounded py-2 h-28 text-Black w-full focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent p-2" />
                        </div>
                    </div>
                </div>   
            </div>
            </Transition.Child>
                <div className="absolute bottom-0 border-t-2 border-Grey-border p-2 bg-white"
                      style={{width:'100vw'}}>
                        <div className="grid px-2">
                            <Button className="bg-Black text-white"> Send message </Button>
                        </div>
                </div>
            </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default FilterDialogue