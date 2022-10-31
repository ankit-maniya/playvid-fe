import { Popover, Transition } from "@headlessui/react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { Fragment } from "react";
import { navigation } from "../../global/utils";

const MyDropdown = () => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-50 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            {open ? (
              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3BottomRightIcon
                className="block h-6 w-6"
                aria-hidden="true"
              />
            )}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen px-4 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      {/* <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                          <item.icon aria-hidden="true" />
                        </div> */}
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          {item.name}
                        </p>
                        {/* <p className="text-sm text-gray-500">
                            {item.description}
                          </p> */}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

const Navbar = ({ back }) => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-1 lg:py-5">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            {/* <MyDropdown /> */}
          </div>
          <div className="flex flex-1 items-center justify-start sm:justify-start">
            <div className="flex flex-shrink-0 items-center text-4xl leading-tight font-extrabold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-pink-500 to-yellow-500">
                Playvid
              </span>
            </div>
            {/* <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? " text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "px-3 py-2 rounded-md text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div> */}
          </div>
          <div className="absolute inset-y-0 right-0 items-center inline-flex">
            {back && (
              <Link
                href="/"
                className="rounded-full bg-white p-3 text-black font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Back
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
