import axios from "axios";

export const deleteMedia = (mediaId: string) =>
  axios.delete(`/media/${mediaId}`);
