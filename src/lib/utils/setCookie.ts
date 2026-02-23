export const setCookie = (name: string, value: string) => {
  const formattedCookie = `${name}=${value}; path=/`;
  document.cookie = formattedCookie;
};
