export const validateIsUrl = (url: string): boolean => {
  const pattern =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  return pattern.test(url);
};

export const validateRallitUrl = (url: string) => {
  if (!validateIsUrl(url)) {
    return "올바른 URL이 아닙니다.";
  }

  if (!url.includes("rallit.com/hub/resumes")) {
    return "랠릿 url이 아닙니다";
  }

  return false;
};
