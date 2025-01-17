import { useEffect, useState } from "react";

const languages = [
  { code: "en", name: "Inglês" },
  { code: "es", name: "Espanhol" },
  { code: "fr", name: "Francês" },
  { code: "de", name: "Alemão" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
];

export default function TranslatorApp() {
  const [sourceLang, setSourceLang] = useState('pt')
  const [targetLang, setTargetLang] = useState('en')
  const [sourceText, setSourceText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    if (sourceText) {
      const delay = setTimeout(() => {
        handleTranslate();
      }, 500);
    
      return () => clearTimeout(delay);
    }
  }, [sourceText, targetLang, sourceLang])
  
  const handleTranslate = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${sourceText}!&langpair=${sourceLang}|${targetLang}`)
    
      if (!response.ok) {
        throw new Error(`HTTP ERROR: ${response.status}`);
      }
      
      const data = await response.json();
      
      setTranslatedText(data.responseData.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Error occurred during translation');
    } finally {
      setIsLoading(false)
    }
  }

  const swapTranslate = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col">
      <header className="bg-black shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center">
          <h1 className="text-gray-100 text-3xl font-sans font-bold">
            Tradutor de Línguas
          </h1>
        </div>
      </header>

      <main className="flex-grow flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-700">
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <LanguageSelect value={sourceLang} onChange={setSourceLang} />

            <button 
              className="p-3 hover:bg-gray-700 rounded-full outline-none transition-colors duration-200"
              onClick={swapTranslate}
            >
              <svg
                className="w-6 h-6 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>

            <LanguageSelect value={targetLang} onChange={setTargetLang} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-700">
            <div className="p-6">
              <textarea
                value={sourceText}
                onChange={(event) => setSourceText(event.target.value)}
                placeholder="Digite o texto"
                className="w-full h-48 text-lg text-gray-100 bg-transparent resize-none border-none outline-none focus:ring-0 placeholder-gray-500"
              ></textarea>
            </div>

            <div className="p-6 relative bg-gray-900">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-gray-300"></div>
                </div>
              ) : (
                <p className="text-lg text-gray-100">{translatedText}</p>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-black shadow-md p-4 border-t border-gray-800 mt-auto">
        <div className="max-w-5xl mx-auto text-center font-sans text-gray-400">
          &copy; {new Date().getFullYear()} Tradutor de Línguas
        </div>
      </footer>
    </div>
  );
}

function LanguageSelect({ value, onChange }) {
  return (
    <select 
      value={value} 
      onChange={(event) => onChange(event.target.value)}
      className="text-sm text-gray-300 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent cursor-pointer transition-all duration-200"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}

