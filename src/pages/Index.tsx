import { useState } from 'react';
import { Building2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CNPJInput } from '@/components/CNPJInput';
import { CNPJDataDisplay } from '@/components/CNPJDataDisplay';
import { SalesAndQRSection } from '@/components/SalesAndQRSection';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<'cnpj' | 'cnpj-data' | 'sales-qr' | 'success'>('cnpj');
  const [cnpjData, setCnpjData] = useState(null);
  const [selectedVendedor, setSelectedVendedor] = useState('');

  const handleCNPJValidated = (data: any) => {
    setCnpjData(data);
    setStep('cnpj-data');
    toast({
      title: "CNPJ validado com sucesso!",
      description: "Os dados da empresa foram carregados automaticamente.",
    });
  };

  const handleCNPJDataContinue = () => {
    setStep('sales-qr');
  };

  const handleSalesSubmit = (vendedor: string) => {
    setSelectedVendedor(vendedor);
    console.log('Dados enviados:', { cnpjData, vendedor });
    setStep('success');
    toast({
      title: "Solicitação enviada!",
      description: "Em breve entraremos em contato para prosseguir com a análise.",
    });
  };

  const handleReset = () => {
    setStep('cnpj');
    setCnpjData(null);
    setSelectedVendedor('');
  };

  const handleBackToCNPJ = () => {
    setStep('cnpj');
  };

  const handleBackToCNPJData = () => {
    setStep('cnpj-data');
  };

  return (
    <div className="totem-container touch-manipulation">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="totem-card p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Logo e Nome da Empresa do Cliente */}
            <div className="flex flex-col items-center lg:items-start space-y-4">
              <div className="w-32 h-32 bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border">
                <span className="text-sm text-muted-foreground text-center">LOGO<br/>CLIENTE</span>
              </div>
              <div className="text-center lg:text-left">
                <div className="h-8 bg-muted rounded-lg flex items-center justify-center px-4 border border-dashed border-border">
                  <span className="text-sm text-muted-foreground">NOME DA EMPRESA</span>
                </div>
              </div>
            </div>
            
            {/* Título Principal */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-3">
                <Building2 className="w-10 h-10 text-primary" />
                <h1 className="text-2xl lg:text-3xl font-bold">Análise de Crédito Empresarial</h1>
              </div>
              <p className="text-base lg:text-lg text-muted-foreground">
                Preencha seus dados para solicitar análise de crédito para sua empresa
              </p>
            </div>
            
            {/* Informações Adicionais */}
            <div className="flex flex-col items-center lg:items-end space-y-2 text-center lg:text-right">
              <div className="text-sm text-muted-foreground">
                <strong>Atendimento:</strong><br />
                Segunda à Sexta<br />
                08:00 às 18:00
              </div>
              <div className="text-xs text-muted-foreground bg-accent px-3 py-1 rounded-full">
                Totem de Autoatendimento
              </div>
            </div>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              step === 'cnpj' ? 'bg-primary text-primary-foreground' : 
              step === 'cnpj-data' || step === 'sales-qr' || step === 'success' ? 'bg-success text-success-foreground' : 
              'bg-muted text-muted-foreground'
            }`}>
              <span className="font-semibold">1</span>
              <span>CNPJ</span>
            </div>
            
            <div className={`w-8 h-1 rounded-full transition-all ${
              step === 'cnpj-data' || step === 'sales-qr' || step === 'success' ? 'bg-success' : 'bg-muted'
            }`} />
            
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              step === 'cnpj-data' ? 'bg-primary text-primary-foreground' : 
              step === 'sales-qr' || step === 'success' ? 'bg-success text-success-foreground' : 
              'bg-muted text-muted-foreground'
            }`}>
              <span className="font-semibold">2</span>
              <span>Dados da Empresa</span>
            </div>
            
            <div className={`w-8 h-1 rounded-full transition-all ${
              step === 'sales-qr' || step === 'success' ? 'bg-success' : 'bg-muted'
            }`} />
            
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              step === 'sales-qr' ? 'bg-primary text-primary-foreground' : 
              step === 'success' ? 'bg-success text-success-foreground' : 
              'bg-muted text-muted-foreground'
            }`}>
              <span className="font-semibold">3</span>
              <span>Vendedor & QR</span>
            </div>
          </div>
        </div>

        {/* Content based on step */}
        <div className="max-w-4xl mx-auto">
          {step === 'cnpj' && (
            <div className="totem-card p-8 text-center fade-in">
              <h2 className="text-2xl font-bold mb-6">Informe o CNPJ da sua empresa</h2>
              <div className="max-w-md mx-auto">
                <CNPJInput onCNPJValidated={handleCNPJValidated} />
              </div>
            </div>
          )}

          {step === 'cnpj-data' && (
            <CNPJDataDisplay 
              cnpjData={cnpjData} 
              onContinue={handleCNPJDataContinue}
              onBack={handleBackToCNPJ}
            />
          )}

          {step === 'sales-qr' && (
            <SalesAndQRSection 
              onSubmit={handleSalesSubmit}
              onBack={handleBackToCNPJData}
            />
          )}

          {step === 'success' && (
            <div className="totem-card p-12 text-center fade-in">
              <CheckCircle2 className="w-20 h-20 text-success mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4 text-success">
                Solicitação Enviada com Sucesso!
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Recebemos seus dados e em breve nossa equipe entrará em contato para dar continuidade ao processo de análise de crédito.
              </p>
              
              <div className="space-y-4 max-w-md mx-auto">
                {selectedVendedor && (
                  <div className="p-4 bg-success/10 rounded-lg mb-4">
                    <p className="text-sm">
                      <strong>Vendedor selecionado:</strong><br />
                      {selectedVendedor}
                    </p>
                  </div>
                )}
                
                <div className="p-4 bg-success/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Próximos passos:</strong><br />
                    • Análise inicial dos dados (24h)<br />
                    • Contato do vendedor selecionado<br />
                    • Envio de documentos adicionais se necessário
                  </p>
                </div>
                
                <Button
                  onClick={handleReset}
                  className="totem-button totem-button-primary w-full"
                >
                  Nova Solicitação
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>© 2024 - Análise de Crédito Empresarial | Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
};

export default Index;