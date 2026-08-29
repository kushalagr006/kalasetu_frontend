import { useState, useEffect } from 'react';

export type LangCode = 'hi' | 'en';

let currentGlobalLang: LangCode = 'hi';
const listeners: Array<(lang: LangCode) => void> = [];

// Load initial language from localStorage on web platform
if (typeof window !== 'undefined' && window.localStorage) {
  try {
    const saved = localStorage.getItem('kalasetu_lang');
    if (saved === 'hi' || saved === 'en') {
      currentGlobalLang = saved;
    }
  } catch (e) {
    // Ignore storage restrictions
  }
}

export function getGlobalLang(): LangCode {
  return currentGlobalLang;
}

export function setGlobalLang(lang: LangCode) {
  currentGlobalLang = lang;
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem('kalasetu_lang', lang);
    } catch (e) {
      // Ignore storage restrictions
    }
  }
  listeners.forEach((listener) => listener(lang));
}

export function subscribeLang(listener: (lang: LangCode) => void) {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

export function useGlobalLang() {
  const [lang, setLangState] = useState<LangCode>(getGlobalLang());

  useEffect(() => {
    setLangState(getGlobalLang());
    const unsubscribe = subscribeLang((newLang) => {
      setLangState(newLang);
    });
    return unsubscribe;
  }, []);

  const changeLang = (newLang: LangCode) => {
    setGlobalLang(newLang);
  };

  return [lang, changeLang] as const;
}
