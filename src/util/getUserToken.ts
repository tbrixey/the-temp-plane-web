export const getUserToken = () => {
  const cookieValue = document.cookie.split("; ");
  let token: string | undefined;
  if (cookieValue.length > 0) {
    token = cookieValue.find((row) => row.startsWith("token="));
    if (token) token = token.split("=")[1];
  }

  return token;
};
