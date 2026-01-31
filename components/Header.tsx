import React from 'react';
import { Snowflake } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="bg-fridec-blue text-white p-1.5 rounded-md">
            <Snowflake size={24} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">
              FRIDEC
            </h1>
            <span className="text-xs font-medium text-slate-500 tracking-wider uppercase">
              Refrigeración Industrial
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-fridec-blue"></span>
          </span>
          <span className="text-sm font-semibold text-slate-600">
            Demo - Asistente Virtual SAT
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;