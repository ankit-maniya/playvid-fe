import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { dummyImg, platformLists } from "../../global/utils";
import sortBy from "lodash/sortBy";

const Plateforms = () => {
  const [state, setState] = useState([]);
  useEffect(() => {
    let favouriteList = localStorage.getItem("favouriteList") || [];

    setState(favouriteList);
  }, []);

  const sortedPlatformLists = sortBy(platformLists, ["isActive"]);

  const disFavouriteList = platformLists.filter((d) =>
    state.includes(d.visitId)
  );

  const hasFavoriteItems = disFavouriteList.length > 0;

  const getImageUrl = (visitId, imgext) => {
    let imageUrl = dummyImg;

    if (!visitId) {
      return imageUrl;
    }

    return "/plateforms/" + visitId + imgext;
  };

  return (
    <>
      {hasFavoriteItems && (
        <div className="inline-flex justify-center items-center w-full mb-5">
          <label className="text-white text-md lg:text-lg bg-indigo-600 rounded-md p-2 shadow-md shadow-indigo-500/50">
            😍 Favourite List
          </label>
        </div>
      )}
      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
        {hasFavoriteItems
          ? disFavouriteList.map((plateform, idx) => {
              const visitId = plateform.visitId;
              const imageUrl = getImageUrl(visitId, plateform.imgext);

              return (
                <Link
                  className="pointer-events-none"
                  key={idx}
                  href={visitId}
                  legacyBehavior
                >
                  <a className="text-slate-900 bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg px-5 py-2.5 text-center mr-2 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:focus:ring-slate-800 items-center">
                    <span className="font-medium flex justify-center align-middle">
                      <div className="w-32">
                        <Image
                          layout={"responsive"}
                          quality={50}
                          width="100%"
                          height="100%"
                          title={`${plateform.alt}`}
                          src={imageUrl}
                          alt={`${plateform.alt}`}
                          loading="lazy"
                        />
                      </div>
                    </span>
                    <span className=" font-bold break-all text-sm md:text-md lg:text-lg">
                      {plateform.title}
                    </span>
                  </a>
                </Link>
              );
            })
          : null}
      </div>
      {hasFavoriteItems && (
        <div className="mt-5">
          <label
            onClick={() => {
              localStorage.setItem("favouriteList", "");
              setState([]);
            }}
            className="text-white text-md lg:text-lg bg-pink-600 rounded-md p-2 shadow-md shadow-pink-500/50"
          >
            Clear List
          </label>
        </div>
      )}
      <div className="w-full lg:w-2/3 mx-auto text-center cursor-pointer leading-10 mt-8">
        <span className="text-md lg:text-lg text-white bg-indigo-600 rounded-md p-2 shadow-md shadow-indigo-500/50">
          👇 Supports The Most Popular Sources 👇
        </span>
      </div>
      <div className="inline-flex justify-center items-center w-full">
        <hr className="my-8 w-64 h-px bg-gray-200 border-0 dark:bg-gray-200" />
      </div>
      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 ">
        {sortedPlatformLists.length > 0
          ? sortedPlatformLists.map((plateform, idx) => {
              const visitId = plateform.visitId;
              const imageUrl = getImageUrl(visitId, plateform.imgext);

              if (!plateform.isActive) {
                return (
                  <div
                    key={idx}
                    className="relative text-slate-900 bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg px-5 py-2.5 text-center mr-2 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:focus:ring-slate-800 items-center"
                  >
                    <span className="font-medium flex justify-center align-middle">
                      <div className="w-32">
                        <Image
                          layout={"responsive"}
                          quality={50}
                          width="100%"
                          height="100%"
                          title={`${plateform.alt}`}
                          src={imageUrl}
                          alt={`${plateform.alt}`}
                          loading="lazy"
                        />
                      </div>
                    </span>
                    <span className=" font-bold break-all text-sm md:text-md lg:text-lg">
                      {plateform.title}
                    </span>
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-70"></div>
                    <div className="select-none absolute top-0 right-0 bottom-0 left-0 m-auto flex justify-center align-middle h-full">
                      <label className="text-lg text-white font-bold break-words self-center ">
                        COMMING SOON
                      </label>
                    </div>
                  </div>
                );
              }

              return (
                <Link key={idx} href={visitId} legacyBehavior>
                  <a
                    onClick={() => {
                      if (!state.includes(visitId)) {
                        localStorage.setItem("favouriteList", [state, visitId]);
                      }
                    }}
                    className="text-slate-900 bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg px-5 py-2.5 text-center mr-2 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:focus:ring-slate-800 items-center"
                  >
                    <span className="font-medium flex justify-center align-middle">
                      <div className="w-32">
                        <Image
                          layout={"responsive"}
                          quality={50}
                          width="100%"
                          height="100%"
                          title={`${plateform.alt}`}
                          src={imageUrl}
                          alt={`${plateform.alt}`}
                          loading="lazy"
                        />
                      </div>
                    </span>
                    <span className=" font-bold break-all text-sm md:text-md lg:text-lg">
                      {plateform.title}
                    </span>
                  </a>
                </Link>
              );
            })
          : null}
      </div>
    </>
  );
};

export default Plateforms;
