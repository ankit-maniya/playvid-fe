import Image from "next/image";
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

export default function Youtube() {
  const videoListSectionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState({});

  const executeScroll = () =>
    videoListSectionRef.current.scrollIntoView({ behavior: "smooth" });

  const handleBtnDownload = async (search) => {
    let domain = ["youtube", "youtu.be"];
    if (!isValidUrl(search, domain)) {
      toast.error(`Please provide youtube link📎!`);
      return;
    }

    const id = toast.loading("Please wait...");
    try {
      setLoading(true);
      const iRes = await VideoService.get_youtube({ url: search });
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

  // useEffect(() => {
  //   console.log(loading);
  //   setTimeout(() => {
  //     executeScroll();
  //   }, 3000);
  // }, [loading]);

  const hasVideos = Object.keys(videoData).length > 0;

  return (
    <>
      <ScrollToTop />
      {loading && <Loader />}

      <div className="lg:h-screen">
        <div className=" lg:h-screen bg-slate-900 backdrop-blur-sm">
          <Navbar back={true} />
          <div className="flex h-full lg:h-vh-80 justify-center align-middle">
            <div className="my-24 lg:m-auto flex-auto">
              <HeroInfo title="Youtube" />

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
                    <Image
                      layout={"responsive"}
                      quality={90}
                      width={1280}
                      height={1920}
                      title={`${videoData.title}`}
                      src={`${
                        videoData.thumbnail ? videoData.thumbnail : dummyImg
                      }`}
                      alt={`${videoData.title}`}
                      priority
                    />
                  </div>
                  <div className="w-full mt-4 lg:mt-0 lg:w-2/3 lg:ml-2">
                    <VideoList data={videoData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
