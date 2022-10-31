// Fetch All Plateforms Images And Lists
let platforms = document.querySelectorAll(".text-decoration-none");
platforms = Array.from(platforms);
platforms.map((feature) => {
  if (feature.querySelector("img")) {
    let image = feature.querySelector("img").getAttribute("src");
    console.log("image", image);
    let title = feature.querySelector("img").getAttribute("title");
    console.log("title", title);
    let alt = feature.querySelector("img").getAttribute("alt");

    return {
      image,
      title,
      alt,
    };
  }
});
