import axios from "axios";

export const auth = async (phone: string, name?: string) => {
  const { data } = await axios.post<{ requestId: string }>("/auth", {
    name,
    phone,
  });
  return data.requestId;
};

export const verify = async (
  phone: string,
  code: string,
  requestId: string
) => {
  const { data } = await axios.post<{
    token: string;
    phone: string;
    name: string;
    avatar: boolean;
  }>("/auth/verify", {
    phone,
    code,
    requestId,
  });
  return data;
};
