import Head from "next/head";

const Fallback = () => (
  <>
    <Head>
      <title>Playvid Video Downloader</title>
    </Head>
    <div className="h-screen bg-slate-900">
      <div
        className="text-white flex h-vh-80
           justify-center align-middle"
      >
        <h1>This is offline fallback page</h1>
        <h2>When offline, any page route will fallback to this page</h2>
      </div>
    </div>
  </>
);

export default Fallback;
