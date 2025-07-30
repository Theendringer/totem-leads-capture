import { Building, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CNPJDataDisplayProps {
  cnpjData: any;
  onContinue: () => void;
  onBack: () => void;
}

export const CNPJDataDisplay = ({ cnpjData, onContinue, onBack }: CNPJDataDisplayProps) => {
  return (
    <div className="space-y-6 fade-in">
      <div className="totem-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-8 h-8 text-success" />
          <h2 className="text-2xl font-bold">CNPJ Validado com Sucesso!</h2>
        </div>
        
        <p className="text-lg text-muted-foreground mb-8">
          Encontramos os seguintes dados da sua empresa:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">RAZÃO SOCIAL</h4>
              <p className="text-lg font-semibold">{cnpjData?.razaoSocial}</p>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">NOME FANTASIA</h4>
              <p className="text-lg font-semibold">{cnpjData?.nomeFantasia}</p>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">TELEFONE</h4>
              <p className="text-lg font-semibold">{cnpjData?.telefone}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">ENDEREÇO</h4>
              <p className="text-lg font-semibold">
                {cnpjData?.endereco}, {cnpjData?.numero}
              </p>
              <p className="text-sm text-muted-foreground">
                {cnpjData?.bairro}, {cnpjData?.cidade} - {cnpjData?.estado}
              </p>
              <p className="text-sm text-muted-foreground">CEP: {cnpjData?.cep}</p>
            </div>
          </div>
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
            onClick={onContinue}
            className="totem-button totem-button-primary"
          >
            Continuar
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};