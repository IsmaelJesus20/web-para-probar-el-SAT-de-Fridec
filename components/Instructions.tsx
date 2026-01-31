import React from 'react';
import { MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';

const Instructions: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
          <MessageSquare className="text-fridec-blue w-5 h-5" />
          <h3 className="font-semibold text-slate-800">¿Qué puedes decir?</h3>
        </div>
        <div className="p-6">
          <p className="text-slate-600 mb-4 text-sm">Prueba estas frases para interactuar con el asistente:</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>"Hola, soy de la empresa <strong>Congelados del Sur</strong>, tenemos una avería."</span>
            </li>
            <li className="flex items-start gap-3 text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>"Necesito un técnico <strong>urgente</strong>, la cámara 3 no enfría."</span>
            </li>
            <li className="flex items-start gap-3 text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>"Somos clientes, hemos detectado una <strong>fuga de refrigerante</strong>."</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl border border-blue-100 p-5">
        <div className="flex gap-3">
          <AlertCircle className="w-6 h-6 text-fridec-blue flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-fridec-blue text-sm uppercase tracking-wide mb-1">
              Información para Testers
            </h4>
            <p className="text-sm text-blue-900 leading-relaxed mb-2">
              Este asistente está configurado para identificar la urgencia y el cliente. 
              Intenta reportar problemas de gravedad alta (fugas, paradas) vs baja (ruidos, mantenimiento) para ver cómo reacciona.
            </p>
            <p className="text-xs text-blue-700 italic border-t border-blue-200 pt-2 mt-2">
              Nota: Este es un entorno de pruebas (sandbox). Los datos recolectados no son reales y no se enviará ningún técnico.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;