import qrCodeImage from '@/assets/qr-code.png';
import { Smartphone, FileText } from 'lucide-react';

export const QRCodeSection = () => {
  return (
    <div className="totem-card p-6 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Smartphone className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-bold">Complete pelo Celular</h3>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Escaneie o QR Code para completar o processo enviando documentos pelo seu celular
      </p>
      
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-white rounded-xl shadow-lg">
          <img 
            src={qrCodeImage} 
            alt="QR Code para completar análise de crédito" 
            className="w-32 h-32"
          />
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="w-4 h-4" />
          <span>Envie documentos para análise de crédito</span>
        </div>
      </div>
    </div>
  );
};