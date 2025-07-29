import { useState } from 'react';
import { Building2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CNPJInput } from '@/components/CNPJInput';
import { ContactForm } from '@/components/ContactForm';
import { QRCodeSection } from '@/components/QRCodeSection';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<'cnpj' | 'form' | 'success'>('cnpj');
  const [cnpjData, setCnpjData] = useState(null);

  const handleCNPJValidated = (data: any) => {
    setCnpjData(data);
    setStep('form');
    toast({
      title: "CNPJ validado com sucesso!",
      description: "Os dados da empresa foram carregados automaticamente.",
    });
  };

  const handleFormSubmit = (data: any) => {
    console.log('Dados enviados:', data);
    setStep('success');
    toast({
      title: "Solicitação enviada!",
      description: "Em breve entraremos em contato para prosseguir com a análise.",
    });
  };

  const handleReset = () => {
    setStep('cnpj');
    setCnpjData(null);
  };

  return (
    <div className="totem-container touch-manipulation">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Building2 className="w-12 h-12 text-primary" />
            <h1 className="text-4xl font-bold">Análise de Crédito Empresarial</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Preencha seus dados para solicitar análise de crédito para sua empresa
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              step === 'cnpj' ? 'bg-primary text-primary-foreground' : 
              step === 'form' || step === 'success' ? 'bg-success text-success-foreground' : 
              'bg-muted text-muted-foreground'
            }`}>
              <span className="font-semibold">1</span>
              <span>CNPJ</span>
            </div>
            
            <div className={`w-8 h-1 rounded-full transition-all ${
              step === 'form' || step === 'success' ? 'bg-success' : 'bg-muted'
            }`} />
            
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              step === 'form' ? 'bg-primary text-primary-foreground' : 
              step === 'success' ? 'bg-success text-success-foreground' : 
              'bg-muted text-muted-foreground'
            }`}>
              <span className="font-semibold">2</span>
              <span>Dados</span>
            </div>
            
            <div className={`w-8 h-1 rounded-full transition-all ${
              step === 'success' ? 'bg-success' : 'bg-muted'
            }`} />
            
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              step === 'success' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <span className="font-semibold">3</span>
              <span>Concluído</span>
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

          {step === 'form' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="totem-button"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Voltar
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ContactForm cnpjData={cnpjData} onSubmit={handleFormSubmit} />
                </div>
                
                <div className="space-y-6">
                  <QRCodeSection />
                  
                  <div className="totem-card p-4 text-center">
                    <h4 className="font-semibold mb-2">💡 Dica</h4>
                    <p className="text-sm text-muted-foreground">
                      Todos os campos marcados com * são obrigatórios para prosseguir com a análise.
                    </p>
                  </div>
                </div>
              </div>
            </>
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