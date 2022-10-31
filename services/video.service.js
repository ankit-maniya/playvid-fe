import gAxios from "./gAxios";

export default class VideoService {
  static async get_youtube(formData) {
    const res = await gAxios.post("api/music/", formData);

    console.log("Api ", res);

    return res.data;
  }

  static async get_facebook(formData) {
    const res = await gAxios.post("api/music/facebook/", formData);

    console.log("Api ", res);

    return res.data;
  }

  static async get_bandcamp(formData) {
    const res = await gAxios.post("api/music/bandcamp/", formData);

    console.log("Api ", res);

    return res.data;
  }
}
