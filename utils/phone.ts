export const serializePhoneNumber = (phone: string) => {
  const num = parseInt(phone.replaceAll(/\D/gm, ""), 10);
  if (!num)
    throw new Error("При преобразовании номера телефона произошла ошибка!");
  return num;
};
