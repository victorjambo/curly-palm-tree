import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { Fragment } from "react";
import Toast from "../toast";

/**
 * Reusable Modal component.
 * @param {Object} props
 * @param {boolean} props.show
 * @param {() => void} props.closeModal
 * @param {React.JSX.Element} props.children
 * @param {string} props.title
 * @param {string} props.width
 * @returns {React.JSX.Element}
 */
const Modal = ({
  show,
  closeModal,
  children,
  title,
  width = "w-11/12 md:w-1/2 lg:w-2/5",
}) => {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        className="fixed z-40 w-screen h-screen overflow-y-scroll no-scroll-bar justify-center align-middle py-auto inset-0 text-center"
        onClose={closeModal}
        open={show}
      >
        <div className="flex items-center h-screen my-auto justify-center text-center text-white sm:px-4 sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={`overflow-y-scroll no-scroll-bar md:my-14 align-middle mx-auto inline-block max-h-screen bg-[#262833] rounded-2xl text-left shadow-xl transform transition-all overflow-hidden p-2 sm:p-6 ${width}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
              style={{
                maxHeight: "calc(100vh - 100px)",
              }}
            >
              <div className="absolute z-10 top-9 right-5">
                <button
                  className="p-2 rounded-full focus:outline-none focus:ring-0"
                  onClick={closeModal}
                >
                  <XMarkIcon className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="font-semibold text-xl text-white leading-8 my-4">
                {title}
              </div>

              <div
                className="overflow-x-scroll mx-auto mb-4 align-middle"
                style={{ maxHeight: "calc(100vh - 112px)" }}
              >
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
        <Toast />
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
