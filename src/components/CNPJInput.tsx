import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CNPJInputProps {
  onCNPJValidated: (data: any) => void;
  disabled?: boolean;
}

export const CNPJInput = ({ onCNPJValidated, disabled }: CNPJInputProps) => {
  const [cnpj, setCnpj] = useState('');
  const [loading, setLoading] = useState(false);

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    if (formatted.length <= 18) {
      setCnpj(formatted);
    }
  };

  const mockCNPJData = {
    razaoSocial: "EMPRESA EXEMPLO LTDA",
    nomeFantasia: "Empresa Exemplo",
    telefone: "(11) 99999-9999",
    cep: "01234-567",
    endereco: "Rua das Flores, 123",
    numero: "123",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP"
  };

  const handleSearch = async () => {
    if (cnpj.replace(/\D/g, '').length !== 14) {
      alert('CNPJ deve ter 14 dígitos');
      return;
    }

    setLoading(true);
    
    // Simular consulta à API
    setTimeout(() => {
      onCNPJValidated(mockCNPJData);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="cnpj" className="text-lg font-semibold">
          CNPJ da Empresa *
        </Label>
        <div className="flex gap-3 mt-2">
          <Input
            id="cnpj"
            value={cnpj}
            onChange={handleCNPJChange}
            placeholder="00.000.000/0000-00"
            className="totem-input flex-1"
            disabled={disabled || loading}
          />
          <Button
            onClick={handleSearch}
            disabled={disabled || loading || cnpj.replace(/\D/g, '').length !== 14}
            className="totem-button totem-button-primary"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Search className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};