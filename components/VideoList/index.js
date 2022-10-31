import { useState } from "react";
import { Tab } from "@headlessui/react";
import {
  MusicalNoteIcon,
  SpeakerXMarkIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

import { tabList } from "../../global/utils";
import { classNames } from "../../global/helper";
import Link from "next/link";

const Loader = ({ animate }) => {
  return (
    <svg
      aria-hidden="true"
      role="status"
      className={`inline mr-3 w-4 h-4 text-white ${
        animate ? "animate-spin" : ""
      }`}
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#E5E7EB"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default function VideoList({ data }) {
  const [videos] = useState(data.formats);
  const [audioVideos = []] = useState(data.adaptiveFormats);

  const onlySongs = audioVideos.filter((d) => {
    if (d.ext && d.ext.length > 0 && d.ext.includes("audio")) return d;
  });

  const hdVideos = audioVideos.filter((d) => {
    if (d.ext && d.ext.length > 0 && d.ext.includes("video")) return d;
  });

  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20">
        {tabList.map((item) => (
          <Tab
            key={item.key}
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            {item.name}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-2">
        {tabList.map((item, idx) => (
          <Tab.Panel
            key={idx}
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-white-400 focus:outline-none focus:ring-2"
            )}
          >
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2">
              {item.name == "Video"
                ? videos.map((video, idx) => (
                    <Link key={video.itag} href={video.url} legacyBehavior>
                      <a
                        href={video.url}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="flex flex-wrap content-between text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-slate-800 items-center"
                      >
                        <div className="w-full">
                          <span className=" font-bold break-all">
                            {video.qualityLabel}
                          </span>
                          <span className=" font-medium flex justify-center align-middle">
                            <VideoCameraIcon
                              className="h-6 w-6"
                              title="Recommanded"
                            />
                          </span>
                          <p className="break-all">{video.ext.slice(-1)[0]}</p>
                        </div>
                        <div
                          className="w-full bg-white rounded-lg p-2 mt-1.5 font-bold text-lg text-indigo-800 shadow-lg
                          "
                        >
                          DOWNLOAD📥
                        </div>
                      </a>
                    </Link>
                  ))
                : null}
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2">
              {item.name == "Song"
                ? onlySongs.map((video, idx) => (
                    <Link key={video.itag} href={video.url} legacyBehavior>
                      <a
                        href={video.url}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="flex flex-wrap content-between text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-slate-800 items-center"
                      >
                        <div className="w-full">
                          <span className=" font-bold break-all">
                            {(video.bitrate / 1000).toFixed(2)} KBPS
                          </span>
                          <span className=" font-medium flex justify-center align-middle">
                            <MusicalNoteIcon
                              className="h-6 w-6"
                              // title={}
                            />
                          </span>
                          <p className="break-all">{video.ext.slice(-1)[0]}</p>
                        </div>
                        <div
                          className="w-full bg-white rounded-lg p-2 mt-1.5 font-bold text-lg text-indigo-800 shadow-lg
                          "
                        >
                          DOWNLOAD📥
                        </div>
                      </a>
                    </Link>
                  ))
                : null}
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2">
              {item.name == "HD Video"
                ? hdVideos.map((video, idx) => {
                    let limit = false;
                    let dlRate = (video.bitrate / 1000000).toFixed(2);

                    if (dlRate < 1) {
                      dlRate = (video.bitrate / 1000).toFixed(2);
                      limit = true;
                    }

                    return (
                      <Link key={video.itag} href={video.url} legacyBehavior>
                        <a
                          href={video.url}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="flex flex-wrap content-between text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-slate-800 items-center"
                        >
                          <div className="w-full">
                            <p className=" font-semibold break-all">
                              {dlRate} {limit ? "KBPS" : "MBPS"}
                            </p>
                            <span className=" font-bold break-all">
                              {video.qualityLabel}
                            </span>
                            <span className=" font-medium flex justify-center align-middle">
                              <SpeakerXMarkIcon
                                className="h-6 w-6"
                                // title={}
                              />
                            </span>
                            <p className="break-all">
                              {video.ext.slice(-1)[0]}
                            </p>
                          </div>
                          <div
                            className="w-full bg-white rounded-lg p-2 mt-1.5 font-bold text-lg text-indigo-800 shadow-lg
                          "
                          >
                            DOWNLOAD📥
                          </div>
                        </a>
                      </Link>
                    );
                  })
                : null}
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
