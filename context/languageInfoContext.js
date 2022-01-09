import { createContext } from "react";

const LanguageInfoContext = createContext({
  languageInfo: {},
  setLanguageInfo: () => {},
});

export default LanguageInfoContext;
