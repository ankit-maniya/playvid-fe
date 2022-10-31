// import got from "got";
// import { createWriteStream } from "fs";

import isArray from "lodash/isArray";

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const isValidUrl = (urlString, validDomain) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator

  if (isArray(validDomain)) {
    for (const val in validDomain) {
      if (urlString.toLowerCase().includes(validDomain[val])) {
        return true;
      }
    }
  }

  if (validDomain) {
    if (!urlString.toLowerCase().includes(validDomain)) {
      return false;
    }
  }

  return !!urlPattern.test(urlString);
};

export const fileDownload = () => {
  // const url = "https://media0.giphy.com/media/4SS0kfzRqfBf2/giphy.gif";
  // const fileName = "image.gif";
  // const downloadStream = got.stream(url);
  // const fileWriterStream = createWriteStream(fileName);
  // downloadStream
  //   .on("downloadProgress", ({ transferred, total, percent }) => {
  //     const percentage = Math.round(percent * 100);
  //     console.error(`progress: ${transferred}/${total} (${percentage}%)`);
  //   })
  //   .on("error", (error) => {
  //     console.error(`Download failed: ${error.message}`);
  //   });
  // fileWriterStream
  //   .on("error", (error) => {
  //     console.error(`Could not write file to system: ${error.message}`);
  //   })
  //   .on("finish", () => {
  //     console.log(`File downloaded to ${fileName}`);
  //   });
  // downloadStream.pipe(fileWriterStream);
};
