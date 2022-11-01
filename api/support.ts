import axios from "axios";

export const sendSupportMail = (
  email: string,
  topic: string,
  message: string
) => axios.post("/support/mail", { email, topic, message });
