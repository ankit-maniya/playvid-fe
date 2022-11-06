import gAxios from "./gAxios";

export default class VideoService {
  static async get_youtube(formData) {
    const res = await gAxios.post("", formData);

    return res.data;
  }

  static async get_facebook(formData) {
    const res = await gAxios.post("facebook/", formData);

    return res.data;
  }

  static async get_bandcamp(formData) {
    const res = await gAxios.post("bandcamp/", formData);

    return res.data;
  }

  static async get_moj(formData) {
    const res = await gAxios.post("moj/", formData);

    return res.data;
  }

  static async get_soundcloud(formData) {
    const res = await gAxios.post("soundcloud/", formData);

    return res.data;
  }
}
