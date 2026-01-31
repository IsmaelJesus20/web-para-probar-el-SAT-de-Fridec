import React from 'react';
import VapiController from './components/VapiController';
import { Sparkles, FileSpreadsheet, ExternalLink, Info, AlertCircle } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-black text-white selection:bg-fridec-blue selection:text-white">
      
      {/* Background Gradient Effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] opacity-40"></div>
      </div>

      <main className="flex-grow w-full max-w-4xl mx-auto px-4 flex flex-col items-center justify-center relative z-10 py-12">
        
        {/* Minimal Hero Section */}
        <section className="text-center space-y-6 mb-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              FRIDEC
            </span>
            Atención Técnica
          </h2>
        </section>

        {/* Contenedor principal ampliado para permitir grid side-by-side */}
        <div className="w-full max-w-3xl space-y-6">
          
          {/* Columna central estrecha para el controlador y los links */}
          <div className="max-w-md mx-auto space-y-6">
            {/* Main Controller */}
            <section className="w-full">
              <VapiController />
            </section>

            {/* Links Section */}
            <section className="w-full p-4 rounded-2xl bg-fridec-card border border-white/10 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://docs.google.com/spreadsheets/d/1C7iXxW6ea4xf6XbVreXV9hLr5HBcKLaBIFAs24gI9Ew/edit?usp=sharing" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all duration-200 group"
                >
                  <FileSpreadsheet className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white">Registro Incidencias</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </a>

                <a 
                  href="https://docs.google.com/spreadsheets/d/1G7SsSO7ky8i26KC1ruX6K7VpTXP-CiMeE5NhORd-c_8/edit?usp=sharing" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all duration-200 group"
                >
                  <FileSpreadsheet className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white">Base de Clientes</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </a>
              </div>
            </section>
          </div>

          {/* Grid Layout para Instrucciones y Aclaraciones (Side by Side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Info Section */}
            <section className="w-full h-full rounded-2xl bg-fridec-card border border-white/10 backdrop-blur-sm p-6">
              <div className="flex items-center gap-2 mb-4 text-white border-b border-white/5 pb-2">
                <Info className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold">Instrucciones</h3>
              </div>
              
              <div className="flex flex-col gap-5 text-sm text-slate-400 leading-relaxed">
                {/* Bloque Registro Incidencias */}
                <div className="space-y-2">
                  <p>
                    En <span className="text-green-400 font-medium">"Registro Incidencias"</span> se registran todas las incidencias/consultas que se hacen cuando llaman y las registra la IA.
                  </p>
                  <div className="pl-3 border-l-2 border-white/10 mt-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Mapea:</p>
                    <p className="text-slate-400">
                      Empresa, Nombre de la persona, Si son clientes, Motivo, Contexto (resumen llamada) y Hora.
                    </p>
                  </div>
                </div>

                {/* Separador Visual */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                {/* Bloque Base de Clientes */}
                <div>
                  <p>
                    <span className="text-blue-400 font-medium">"Base de Clientes"</span> es la lista de clientes inventados. La idea sería que fuera lo más parecido a vuestro sistema de almacenamiento de clientes o incluso que se pueda nutrir del ERP directamente.
                  </p>
                </div>
              </div>
            </section>

            {/* Aclaraciones Section */}
            <section className="w-full h-full rounded-2xl bg-fridec-card border border-white/10 backdrop-blur-sm p-6">
              <div className="flex items-center gap-2 mb-4 text-white border-b border-white/5 pb-2">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-semibold">Aclaraciones</h3>
              </div>
              
              <div className="text-sm text-slate-400 leading-relaxed">
                <p>
                  Por el momento es algo muy muy sencillo, pero quiero saber un poco el feedback sobre todo de la conversación con él. Sigo modificándolo porque me da problemas a la hora de saber como plantearle una conversación y empiece a saber como identificar si una llamada es una incidencia o si es una consulta, porque hay momento que falla.
                </p>
              </div>
            </section>

          </div>

        </div>

      </main>

      {/* Footer Minimalista (Sin texto promocional) */}
      <footer className="w-full py-6 relative z-10">
      </footer>
    </div>
  );
}

export default App;