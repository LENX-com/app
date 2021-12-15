import { Dialog, Transition } from '@headlessui/react'
import { useState, Fragment, useRef, useEffect } from 'react'
import { AiOutlineShoppingCart, AiOutlineClose, AiFillStar } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux'
import Button from '../../../components/Buttons/Button'
import { createAnswer } from '../../../actions/questionAction'  

const AnswerPop = ({question}) => {
  let [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer ] = useState("")
  let completeButtonRef1 = useRef(null);
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const clickSubmit = (event) => {
      event.preventDefault();
      const answerData = {
          answer: answer,
      };
      dispatch(createAnswer(question._id, answerData))
      setAnswer("")
  }

  return (
    <div>
        <div
            ref={completeButtonRef1}>
             <Button className="bg-orange-light text-white shadow-none text-sm" onClick={ () => setIsOpen(true)}>
                Answer
            </Button>
        </div>

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
                    className="absolute bottom-0 w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-background shadow-xl  overflow-y-scroll"
                    style= {{height:'50vh'}}
                    >
                <Dialog.Title
                  as="div"
                  className="border-b-2 border-Grey border-solid"
                >
                  <div className="px-4 py-2 flex bg-white"> 
                  <h2 className="text-lg font-medium leading-6 text-gray-900 mt-2"> Answer this question</h2>
                  <div onClick={ () => setIsOpen(false) } className="ml-auto text-xl text-white rounded-full p-2 bg-Black">
                      <AiOutlineClose  />
                  </div> 
                  </div> 
                </Dialog.Title>
                <div className="p-2">
                    {question && 
                        <div className= "font-bold text-lg">
                            {question.question}
                        </div>    
                        }
                    <div className="my-3">
                        <input 
                            className="shadow appearance-none border rounded py-2 h-28 text-Black w-full focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent p-2"
                            value = {answer}
                            type = "text"
                            onChange = {(event) => setAnswer(event.target.value)}    
                        />
                    </div>
                </div>
            </div>
            </Transition.Child>
                <div className="absolute bottom-0 border-t-2 border-Grey-border p-2 bg-white"
                      style={{width:'100vw'}}>
                    <div className="grid px-2">
                        <Button className="bg-Black text-white" onClick ={clickSubmit}> Post answer </Button>
                    </div>
                </div>
            </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default AnswerPop