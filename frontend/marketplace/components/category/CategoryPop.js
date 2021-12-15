import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment, useRef } from "react";
import { Filter as FilterIcon } from "../../assets/icons";
import { AiOutlineClose } from "react-icons/ai";

const CategoryPop = ({ children }) => {
  let [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  const completeButtonref = useRef(null);

  return (
    <>
      <div>
        <button
          type="button"
          ref={completeButtonref}
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-lightBlack rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <FilterIcon />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          initialFocus={completeButtonref}
          className="fixed inset-0 overflow-y-auto"
          style={{ zIndex: "999" }}
          onClose={() => setIsOpen(false)}
          open={isOpen}
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
              <Dialog.Overlay className="fixed inset-0" />
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
              <div className="inline-block w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl ">
                <Dialog.Title
                  as="div"
                  className="border-b-2 border-Grey border-solid"
                >
                  <div className="p-5 flex">
                    <h2 className="text-lg font-medium leading-6 text-gray-900">
                      {" "}
                      Filter{" "}
                    </h2>
                    <div
                      onClick={() => setIsOpen(false)}
                      className="ml-auto text-xl text-white rounded-full p-2 bg-Black"
                    >
                      <AiOutlineClose />
                    </div>
                  </div>
                </Dialog.Title>
                <div className="p-6">{children}</div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CategoryPop;
