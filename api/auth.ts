import axios from "axios";

export const auth = async (phone: number, name?: string) => {
  const { data } = await axios.post<{ requestId: string }>("/auth", {
    name,
    phone,
  });
  return data.requestId;
};

export const verify = async (
  phone: number,
  code: string,
  requestId: string
) => {
  const { data } = await axios.post<{
    token: string;
    phone: number;
    name: string;
    avatar: boolean;
  }>("/auth/verify", {
    phone,
    code,
    requestId,
  });
  return data;
};
