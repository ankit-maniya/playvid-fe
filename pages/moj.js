import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { useRef, useState } from "react";
import { toast } from "react-toastify";

import VideoList from "../components/VideoList";
import SearchBar from "../components/SearchBar";
import HeroInfo from "../components/HeroInfo";
import Navbar from "../components/Navbar";
import { ScrollToTop } from "../components/ScrollToTop";
import Loader from "../components/Loader";

import { isValidUrl } from "../global/helper";
import VideoService from "../services/video.service";
import { dummyImg } from "../global/utils";
import { PhotoIcon, VideoCameraIcon } from "@heroicons/react/24/outline";

const Moj = () => {
  const videoListSectionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState();

  const executeScroll = () =>
    videoListSectionRef.current.scrollIntoView({ behavior: "smooth" });

  const handleBtnDownload = async (search) => {
    let domain = ["moj", "mojapp"];
    if (!isValidUrl(search, domain)) {
      toast.error(`Please provide ${domain} link📎!`);
      return;
    }

    const id = toast.loading("Please wait...");

    try {
      setLoading(true);
      const iRes = await VideoService.get_moj({ url: search });
      iRes["title"] = iRes["title"][0];

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

  const hasVideos = videoData && videoData.url;

  return (
    <>
      <Head>
        <title>{videoData?.title || "Moj Video Downloader"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:type" content="website" />
        <meta name="description" content={videoData?.title} />
        <meta name="keywords" content={videoData?.title} />

        <meta property="og:title" content={videoData?.title} />
        <meta property="og:url" content={videoData?.url} />
        <meta property="og:description" content={videoData?.title} />
        <meta property="og:image" content={videoData?.thumbnail} />
      </Head>
      <ScrollToTop />
      {loading && <Loader />}

      <div className="lg:h-screen">
        <div className=" lg:h-screen bg-slate-900 backdrop-blur-sm">
          <Navbar back={true} />
          <div className="flex h-full lg:h-vh-80 justify-center align-middle">
            <div className="my-24 lg:m-auto flex-auto">
              <HeroInfo title="Moj" />

              <div className="p-5 pt-7 lg:p-10">
                <SearchBar handleDownload={handleBtnDownload} />
              </div>
              {!loading && hasVideos && (
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

      <div>
        {!loading && hasVideos && (
          <div className="h-full lg:h-vh-70" ref={videoListSectionRef}>
            <div className="p-5 px-7 lg:px-10 ">
              <div className="mx-auto max-w-7xl">
                <div className="text-lg md:text-2xl lg:text-5xl text-white font-semibold text-center mb-3 lg:mb-10">
                  {videoData.title}
                </div>
                <div className="flex-col lg:flex lg:flex-row">
                  <div className="w-full lg:w-1/3">
                    <div className="w-auto max-w-lg mx-auto">
                      <Image
                        layout={"responsive"}
                        quality={90}
                        width="100%"
                        height="100%"
                        title={`${videoData.title}`}
                        src={`${
                          videoData.thumbnail ? videoData.thumbnail : dummyImg
                        }`}
                        alt={`${videoData.title}`}
                      />
                    </div>
                  </div>
                  <div className="w-full mt-4 lg:mt-0 lg:w-2/3 lg:ml-2">
                    <div className="grid grid-cols-1 gap-4">
                      <Link href={videoData.url} legacyBehavior>
                        <a
                          href={videoData.url}
                          rel="noopener noreferrer"
                          // target="_blank"
                          className="flex flex-wrap content-between text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-slate-800 items-center"
                        >
                          <div className="w-full">
                            <p className="font-bold break-all">
                              {videoData.bitrate
                                ? (videoData.bitrate / 1000).toFixed(2)
                                : 128}
                              KBPS
                            </p>
                            <span className=" font-medium flex justify-center align-middle">
                              <VideoCameraIcon
                                className="h-6 w-6"
                                title="Recommanded"
                              />
                            </span>
                            <p className="break-all">{videoData.ext} 🎥</p>
                            <span className="text-lg font-bold break-word">
                              “{videoData.title}”
                            </span>
                          </div>
                          <div
                            className="w-full bg-white rounded-lg p-2 mt-1.5 font-bold text-lg text-indigo-800 shadow-lg
                          "
                          >
                            DOWNLOAD Video 📥
                          </div>
                        </a>
                      </Link>

                      <Link href={videoData.thumbnail} legacyBehavior>
                        <a
                          href={videoData.thumbnail}
                          rel="noopener noreferrer"
                          // target="_blank"
                          className="flex flex-wrap content-between text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-slate-800 items-center"
                        >
                          <div className="w-full">
                            <p className="font-bold break-all">
                              {videoData.bitrate
                                ? (videoData.bitrate / 1000).toFixed(2)
                                : 128}
                              KBPS
                            </p>
                            <span className=" font-medium flex justify-center align-middle">
                              <PhotoIcon
                                className="h-6 w-6"
                                title="Recommanded"
                              />
                            </span>
                            <p className="break-all">jpeg 🖼️</p>
                            <span className="text-lg font-bold break-word">
                              “{videoData.title}”
                            </span>
                          </div>
                          <div
                            className="w-full bg-white rounded-lg p-2 mt-1.5 font-bold text-lg text-indigo-800 shadow-lg
                          "
                          >
                            DOWNLOAD Thumbnail 📥
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Moj;
