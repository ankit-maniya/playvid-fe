import { useEffect, useState } from "react";

import HeroInfo from "../components/HeroInfo";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Plateforms from "../components/PlateformList";
import { ScrollToTop } from "../components/ScrollToTop";
import Head from "next/head";

export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [loading]);

  return (
    <>
      <Head>
        <title>Playvid Video Downloader</title>
        <meta property="og:type" content="website" />
      </Head>
      <div>
        {loading && <Loader />}
        <ScrollToTop />

        <div className="h-screen">
          <div className="h-screen">
            <Navbar />
            <div
              className="flex h-vh-80
           justify-center align-middle"
            >
              <div className="m-auto flex-auto">
                <HeroInfo title="Any" />

                <div className="p-2 pr-0 mt-10">
                  <Plateforms />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
