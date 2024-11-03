export default function FormatPhoneNumber(phone) {
  const cleanNum = ("" + phone.toString()).replace(/\D/g, "");
  const match = cleanNum.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return [
      "+38 ",
      "(",
      match[1],
      ") ",
      match[2],
      "-",
      match[3],
      "-",
      match[4],
    ].join("");
  }
  return cleanNum;
}
