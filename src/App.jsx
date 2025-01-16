import { useState } from "react";

const languages = [
  { code: "en", name: "Inglês" },
  { code: "es", name: "Espanhol" },
  { code: "fr", name: "Francês" },
  { code: "de", name: "Alemão" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
];

function App() {
  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items center">
            <h1 className="text-headerColor text-2xl font-sans font-medium">
              Tradutor de Linguas
            </h1>
          </div>
        </header>

        <main className="flex-grow flex items-start justify-center px-4 py-8">
          <div className="w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <select className="text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer">
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>

              <button className="p-2 hover:bg-gray-200 rounded-full outline-none">
                <svg
                  className="w-5 h-5 text-headerColor"
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

              <select className="text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer">
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                <textarea
                  placeholder="Digite o texto"
                  className="w-full h-40 text-lg text-textColor bg-transparent resize-none border-none outline-none"
                ></textarea>



              </div>

              <div className="p-4 relative bg-secondaryBackground border-l border-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-200"></div>


                  <p className="text-lg text-textColor"> </p>
                </div>

              </div>


            </div>
          </div>
        </main>

                <footer className=" bg-secondaryBackground shadow-2xl p-4 border-t border-gray-200 mt-autp ">

                  <div className="font-sans">
                  &copy;{new Date().getFullYear()}  Tradutor de Linguas
                  </div>

                </footer>

      </div>
    </>
  );
}

export default App;
