import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Mic, PhoneOff, Loader2, AlertTriangle } from 'lucide-react';
import { CallStatus } from '../types';

// ==========================================
// CONFIGURACIÓN DE VAPI
// ==========================================
// 1. Ve a https://dashboard.vapi.ai/
// 2. Copia tu Public Key de la sección Account/Org
// 3. Copia el ID del Asistente que quieres usar
// ==========================================
const VAPI_PUBLIC_KEY = "44134459-dc05-495e-a0a8-641860eb485e";
const VAPI_ASSISTANT_ID = "2960c98a-b055-4e0f-8680-a58a5a6d8d9b"; 

const VapiController: React.FC = () => {
  const [status, setStatus] = useState<CallStatus>('idle');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isVapiReady, setIsVapiReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const vapiInstance = useRef<any>(null);

  // Cargar el script de Vapi dinámicamente
  const loadVapiScript = useCallback(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.vapi.ai/vapi.js";
    script.async = true;
    script.onload = () => {
      initializeVapi();
    };
    document.body.appendChild(script);
  }, []);

  // Inicializar la instancia de Vapi una vez cargado el script
  const initializeVapi = () => {
    if ((window as any).Vapi) {
      // Instanciar Vapi con la Public Key
      const vapi = new (window as any).Vapi(VAPI_PUBLIC_KEY);
      vapiInstance.current = vapi;
      setIsVapiReady(true);

      // Eventos de llamada
      vapi.on('call-start', () => {
        setError(null);
        setStatus('active');
        setIsSpeaking(false);
      });

      vapi.on('call-end', () => {
        setStatus('idle');
        setIsSpeaking(false);
      });

      // Eventos de voz (para la animación)
      vapi.on('speech-start', () => {
        setIsSpeaking(true);
      });

      vapi.on('speech-end', () => {
        setIsSpeaking(false);
      });

      vapi.on('error', (e: any) => {
        console.error("Vapi Error:", e);
        const errorMsg = e?.message || e?.error?.message || 'Error de conexión con el asistente';
        setError(errorMsg);
        setStatus('idle');
        setIsSpeaking(false);
      });
    } else {
      console.error("Vapi SDK not found on window");
      setError("No se pudo cargar el SDK de VAPI");
    }
  };

  useEffect(() => {
    loadVapiScript();
    
    // Cleanup al desmontar
    return () => {
      if (vapiInstance.current) {
        vapiInstance.current.stop();
      }
    };
  }, [loadVapiScript]);

  const handleToggleCall = async () => {
    if (!vapiInstance.current) {
      setError("VAPI no está listo. Recarga la página.");
      return;
    }

    setError(null); // Limpiar errores anteriores

    if (status === 'idle') {
      setStatus('connecting');
      try {
        // Iniciar llamada real
        await vapiInstance.current.start(VAPI_ASSISTANT_ID);
      } catch (err: any) {
        console.error("Error starting call", err);
        setError(err?.message || "Error al iniciar la llamada. Verifica los permisos del micrófono.");
        setStatus('idle');
      }

    } else if (status === 'active' || status === 'connecting') {
      setStatus('ending');
      try {
        // Terminar llamada real
        await vapiInstance.current.stop();
      } catch (err: any) {
        console.error("Error stopping call", err);
        setStatus('idle');
      }
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case 'connecting':
        return <Loader2 className="animate-spin w-8 h-8" />;
      case 'active':
        return <PhoneOff className="w-8 h-8" />;
      case 'ending':
        return <Loader2 className="animate-spin w-8 h-8" />;
      default:
        return <Mic className="w-8 h-8" />;
    }
  };

  // Verificación de seguridad para no mostrar una UI rota si faltan las keys
  const isConfigured = VAPI_PUBLIC_KEY !== "TU_PUBLIC_KEY_AQUI" && VAPI_ASSISTANT_ID !== "TU_ASSISTANT_ID_AQUI";

  if (!isConfigured) {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-red-900/20 border border-red-500/30 text-center">
        <AlertTriangle className="w-10 h-10 text-red-400 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Faltan Credenciales</h3>
        <p className="text-slate-300 mb-4 text-sm">
          Para usar el modo producción, edita <code>components/VapiController.tsx</code> y añade tu <strong>Public Key</strong> y <strong>Assistant ID</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-3xl bg-fridec-card border border-white/10 shadow-2xl backdrop-blur-sm w-full">
      
      {/* Visual Ring Container */}
      <div className="relative mb-2">
        {/* Only animate when isSpeaking is true (driven by real Vapi events) */}
        {status === 'active' && isSpeaking && (
          <>
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping-slow scale-150"></div>
            <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-10 animate-pulse scale-125"></div>
          </>
        )}
        
        <button
          onClick={handleToggleCall}
          disabled={!isVapiReady || status === 'connecting' || status === 'ending'}
          className={`
            relative z-10 flex items-center justify-center w-24 h-24 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/30
            ${status === 'active' 
              ? 'bg-red-500 hover:bg-red-600 shadow-[0_0_30px_rgba(239,68,68,0.4)] text-white' 
              : 'bg-blue-600 hover:bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)] text-white'}
            ${(!isVapiReady || status === 'connecting' || status === 'ending') ? 'cursor-wait opacity-80' : 'cursor-pointer'}
          `}
          aria-label={status === 'active' ? 'Colgar llamada' : 'Iniciar llamada'}
        >
           {getButtonContent()}
        </button>
      </div>

      {/* Helper Text */}
      <div className="min-h-[24px] mt-4 text-center">
        {error ? (
          <p className="text-sm font-medium text-red-400">{error}</p>
        ) : status === 'connecting' ? (
          <p className="text-sm font-medium text-yellow-400">Conectando... Permite el micrófono</p>
        ) : status === 'active' ? (
          <p className="text-sm font-medium text-green-400">Llamada activa - Habla con el asistente</p>
        ) : (
          <p className="text-sm font-medium text-slate-400">Pulsa para empezar conversación</p>
        )}
      </div>

    </div>
  );
};

export default VapiController;
