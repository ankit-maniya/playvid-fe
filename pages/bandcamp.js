import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { MusicalNoteIcon } from "@heroicons/react/24/outline";

import SearchBar from "../components/SearchBar";
import HeroInfo from "../components/HeroInfo";
import Navbar from "../components/Navbar";
import { ScrollToTop } from "../components/ScrollToTop";
import Loader from "../components/Loader";

import { isValidUrl } from "../global/helper";
import VideoService from "../services/video.service";
import { dummyImg } from "../global/utils";

const Bandcamp = () => {
  const videoListSectionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState();

  const executeScroll = () =>
    videoListSectionRef.current.scrollIntoView({ behavior: "smooth" });

  const handleBtnDownload = async (search) => {
    let domain = "bandcamp";
    if (!isValidUrl(search, domain)) {
      toast.error(`Please provide ${domain} link📎!`);
      return;
    }

    const id = toast.loading("Please wait...");

    try {
      setLoading(true);
      const iRes = await VideoService.get_bandcamp({ url: search });
      setVideoData(iRes);

      toast.update(id, {
        render: "Data Fetched Successfully!",
        type: "success",
        isLoading: false,
        autoClose: true,
        closeOnClick: true,
      });

      setLoading(false);
    } catch (error) {
      console.error("error :: ", error);

      setLoading(false);
      toast.update(id, {
        render: "Error Occure",
        type: "error",
        isLoading: false,
        autoClose: true,
        closeOnClick: true,
      });
    }
  };

  useEffect(() => {}, []);

  const hasMultiVideos = videoData && (videoData.all_videos || []).length > 0;

  return (
    <>
      {videoData && (
        <Head>
          <title>{videoData.title}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta property="og:type" content="website" />
          <meta name="description" content={videoData.artist} />
          <meta name="keywords" content={videoData.title} />

          <meta property="og:title" content={videoData.title} />
          <meta property="og:url" content={videoData.thumbnail} />
          <meta property="og:description" content={videoData.title} />
          <meta property="og:image" content={videoData.thumbnail} />
        </Head>
      )}
      <ScrollToTop />
      {loading && <Loader />}

      <div className="lg:h-screen">
        <div className=" lg:h-screen bg-slate-900 backdrop-blur-sm">
          <Navbar back={true} />
          <div className="flex h-full lg:h-vh-80 justify-center align-middle">
            <div className="my-24 lg:m-auto flex-auto">
              <HeroInfo fulltitle="Download Bandcamp Audio" />

              <div className="p-5 pt-7 lg:p-10">
                <SearchBar handleDownload={handleBtnDownload} />
              </div>
              {!loading && (hasMultiVideos || videoData) && (
                <div className="w-full lg:w-2/3 mx-auto text-center cursor-pointer leading-10">
                  <span
                    className="text-white animate-pulse bg-indigo-600 rounded-md p-2 shadow-md shadow-indigo-500/50"
                    onClick={() => executeScroll()}
                  >
                    👇 Scrolldown And Download Videos 👇
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {(hasMultiVideos || videoData) && (
        <div className="h-full lg:h-vh-70" ref={videoListSectionRef}>
          <div className="px-5 lg:px-20 lg:pb-5 ">
            <div className=" py-8 px-8 m-1 bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
              <Image
                layout={"responsive"}
                quality={90}
                width={100}
                height={100}
                title={`${videoData.title}`}
                className="block mx-auto h-24 rounded-md sm:mx-0 sm:shrink-0 "
                src={`${videoData.thumbnail ? videoData.thumbnail : dummyImg}`}
                alt={`${videoData.title}`}
              />

              <div className="text-center space-y-2 sm:text-left">
                <div className="space-y-0.5">
                  <p className="text-lg text-black font-semibold">
                    {videoData.artist}
                  </p>
                  <p className="text-slate-500 font-medium">
                    {videoData.album}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-1 pb-4">
              {videoData.url && (
                <Link key={videoData.id} href={videoData.url} legacyBehavior>
                  <a
                    href={videoData.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex flex-wrap content-between text-white  m-1 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-slate-800 items-center"
                  >
                    <div className="w-full">
                      <span className="font-bold break-all">
                        {videoData.bitrate
                          ? (videoData.bitrate / 1000).toFixed(2)
                          : 128}
                        KBPS
                      </span>
                      <span className=" font-medium flex justify-center align-middle">
                        <MusicalNoteIcon
                          className="h-6 w-6"
                          // title={}
                        />
                      </span>
                      <p className="break-all">{videoData.ext}</p>
                      <p className="break-all">
                        Duration: {(videoData.duration / 60).toFixed(2)}
                      </p>
                      <p className="break-words text-lg font-bold">
                        {videoData.track}
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
              )}
              {hasMultiVideos
                ? videoData.all_videos.map((video, idx) => {
                    return (
                      <Link key={video.id} href={video.url} legacyBehavior>
                        <a
                          href={video.url}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="flex flex-wrap content-between text-white m-1 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-slate-800 items-center"
                        >
                          <div className="w-full">
                            <span className="font-bold break-all">
                              {video.bitrate
                                ? (video.bitrate / 1000).toFixed(2)
                                : 128}
                              KBPS
                            </span>
                            <span className=" font-medium flex justify-center align-middle">
                              <MusicalNoteIcon
                                className="h-6 w-6"
                                // title={}
                              />
                            </span>
                            <p className="break-all">{video.ext}</p>
                            <p className="break-all">
                              Duration: {(video.duration / 60).toFixed(2)}
                            </p>
                            <p className="break-words text-lg font-bold">
                              “{video.track}”
                            </p>
                          </div>
                          <div
                            className="bg-white w-full rounded-lg p-2 mt-1.5 font-bold text-lg text-indigo-800 shadow-lg
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
          </div>
        </div>
      )}
    </>
  );
};

export default Bandcamp;
