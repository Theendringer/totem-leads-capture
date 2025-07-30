import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { QRCodeSection } from '@/components/QRCodeSection';
import { Send, Users } from 'lucide-react';

interface SalesAndQRSectionProps {
  onSubmit: (vendedor: string) => void;
  onBack: () => void;
}

export const SalesAndQRSection = ({ onSubmit, onBack }: SalesAndQRSectionProps) => {
  const [selectedVendedor, setSelectedVendedor] = useState('');

  const vendedores = [
    'João Silva - Vendas Corporativas',
    'Maria Santos - Crédito Empresarial', 
    'Carlos Oliveira - Relacionamento',
    'Ana Costa - Grandes Contas'
  ];

  const handleSubmit = () => {
    onSubmit(selectedVendedor);
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seleção de Vendedor */}
        <div className="totem-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold">Selecione um Vendedor</h3>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Escolha o vendedor de sua preferência para acompanhar sua solicitação (opcional)
          </p>

          <div className="space-y-4">
            <Label htmlFor="vendedor" className="text-base font-semibold">
              Vendedor de Preferência
            </Label>
            <Select value={selectedVendedor} onValueChange={setSelectedVendedor}>
              <SelectTrigger className="totem-input">
                <SelectValue placeholder="Selecione um vendedor (opcional)" />
              </SelectTrigger>
              <SelectContent>
                {vendedores.map((vendedor, index) => (
                  <SelectItem key={index} value={vendedor}>
                    {vendedor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
            <Button
              onClick={onBack}
              variant="outline"
              className="totem-button"
            >
              Voltar
            </Button>
            
            <Button
              onClick={handleSubmit}
              className="totem-button totem-button-success"
            >
              <Send className="w-5 h-5 mr-2" />
              Finalizar Solicitação
            </Button>
          </div>
        </div>

        {/* QR Code */}
        <div className="space-y-6">
          <QRCodeSection />
          
          <div className="totem-card p-6 text-center">
            <h4 className="font-semibold mb-2">💡 Dica</h4>
            <p className="text-sm text-muted-foreground">
              Você pode finalizar agora ou escanear o QR Code para enviar documentos adicionais pelo celular.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};