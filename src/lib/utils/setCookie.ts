export const setCookie = (name: string, value: string, maxAge: number) => {
  const formattedCookie = `${name}=${value}; path=/; max-age=${maxAge}`;
  document.cookie = formattedCookie;
};
