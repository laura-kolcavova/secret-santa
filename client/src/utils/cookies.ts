export const getCookie = (name: string): string | undefined => {
  console.log(document.cookie, document.cookie.split('; '));

  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
};
