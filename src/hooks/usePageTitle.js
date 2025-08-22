import { useEffect } from "react";

export const usePageTitle = (title, defaultTitle = "Emprog") => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${defaultTitle}`;
    } else {
      document.title = defaultTitle;
    }
  }, [title, defaultTitle]);
};
