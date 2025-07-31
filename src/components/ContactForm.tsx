import { useState, useEffect } from 'react';
import { Send, User, MapPin, Phone, Mail, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface ContactFormProps {
  cnpjData: any;
  onSubmit: (data: any) => void;
}

export const ContactForm = ({ cnpjData, onSubmit }: ContactFormProps) => {
  const { toast } = useToast();
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    email: '',
    nome: '',
    sobrenome: '',
    inscricaoEstadual: '',
    razaoSocial: cnpjData?.razaoSocial || '',
    nomeFantasia: cnpjData?.nomeFantasia || '',
    telefonePrincipal: cnpjData?.telefone || '',
    telefoneSecundario: '',
    cep: cnpjData?.cep || '',
    endereco: cnpjData?.endereco || '',
    numero: cnpjData?.numero || '',
    complemento: '',
    bairro: cnpjData?.bairro || '',
    cidade: cnpjData?.cidade || '',
    estado: cnpjData?.estado || '',
    nomeLocal: '',
    pontosReferencia: '',
    vendedor: ''
  });

  useEffect(() => {
    if (cnpjData) {
      setFormData(prev => ({
        ...prev,
        razaoSocial: cnpjData.razaoSocial || '',
        nomeFantasia: cnpjData.nomeFantasia || '',
        telefonePrincipal: cnpjData.telefone || '',
        cep: cnpjData.cep || '',
        endereco: cnpjData.endereco || '',
        numero: cnpjData.numero || '',
        bairro: cnpjData.bairro || '',
        cidade: cnpjData.cidade || '',
        estado: cnpjData.estado || ''
      }));
    }
  }, [cnpjData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Marcar campo como tocado quando o usuário começar a digitar
    if (!touchedFields[field]) {
      setTouchedFields(prev => ({ ...prev, [field]: true }));
    }
  };

  const requiredFields = [
    'email', 'nome', 'sobrenome', 'inscricaoEstadual', 'razaoSocial', 
    'nomeFantasia', 'telefonePrincipal', 'cep', 'endereco', 'numero', 
    'bairro', 'cidade', 'estado'
  ];

  const isFieldRequired = (fieldName: string) => requiredFields.includes(fieldName);
  const isFieldEmpty = (fieldName: string) => !formData[fieldName as keyof typeof formData];
  const shouldShowError = (fieldName: string) => 
    isFieldRequired(fieldName) && isFieldEmpty(fieldName) && touchedFields[fieldName];

  const getInputClassName = (fieldName: string) => {
    const baseClass = "totem-input mt-2";
    if (shouldShowError(fieldName)) {
      return `${baseClass} border-destructive border-2 bg-destructive/5 focus:border-destructive focus:ring-destructive/20`;
    }
    return baseClass;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const handleSubmit = () => {
    // Marcar todos os campos obrigatórios como tocados para mostrar erros
    const touchedState: Record<string, boolean> = {};
    requiredFields.forEach(field => {
      touchedState[field] = true;
    });
    setTouchedFields(touchedState);

    // Validação básica
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: `Por favor, preencha todos os campos obrigatórios marcados com * (${missingFields.length} campos em vermelho)`,
        variant: "destructive"
      });
      return;
    }

    onSubmit(formData);
  };

  const vendedores = [
    'João Silva - Vendas Corporativas',
    'Maria Santos - Crédito Empresarial', 
    'Carlos Oliveira - Relacionamento',
    'Ana Costa - Grandes Contas'
  ];

  return (
    <div className="space-y-6 fade-in">
      {/* Dados Pessoais */}
      <div className="totem-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-bold">Dados Pessoais</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="text-base font-semibold">
              <Mail className="w-4 h-4 inline mr-2" />
              E-mail *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="seuemail@empresa.com"
              className={getInputClassName('email')}
            />
          </div>

          <div>
            <Label htmlFor="nome" className="text-base font-semibold">Nome *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              placeholder="Seu nome"
              className={getInputClassName('nome')}
            />
          </div>

          <div>
            <Label htmlFor="sobrenome" className="text-base font-semibold">Sobrenome *</Label>
            <Input
              id="sobrenome"
              value={formData.sobrenome}
              onChange={(e) => handleInputChange('sobrenome', e.target.value)}
              placeholder="Seu sobrenome"
              className={getInputClassName('sobrenome')}
            />
          </div>

        </div>
      </div>

      {/* Dados da Empresa */}
      <div className="totem-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Building className="w-6 h-6 text-success" />
          <h3 className="text-xl font-bold">Dados da Empresa</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="razaoSocial" className="text-base font-semibold">Razão Social *</Label>
            <Input
              id="razaoSocial"
              value={formData.razaoSocial}
              onChange={(e) => handleInputChange('razaoSocial', e.target.value)}
              className={getInputClassName('razaoSocial')}
            />
          </div>

          <div>
            <Label htmlFor="nomeFantasia" className="text-base font-semibold">Nome Fantasia *</Label>
            <Input
              id="nomeFantasia"
              value={formData.nomeFantasia}
              onChange={(e) => handleInputChange('nomeFantasia', e.target.value)}
              className={getInputClassName('nomeFantasia')}
            />
          </div>

          <div>
            <Label htmlFor="inscricaoEstadual" className="text-base font-semibold">Inscrição Estadual *</Label>
            <Input
              id="inscricaoEstadual"
              value={formData.inscricaoEstadual}
              onChange={(e) => handleInputChange('inscricaoEstadual', e.target.value)}
              placeholder="ISENTO ou números"
              className={getInputClassName('inscricaoEstadual')}
            />
          </div>

          <div>
            <Label htmlFor="telefonePrincipal" className="text-base font-semibold">
              <Phone className="w-4 h-4 inline mr-2" />
              Telefone Principal *
            </Label>
            <Input
              id="telefonePrincipal"
              value={formData.telefonePrincipal}
              onChange={(e) => handleInputChange('telefonePrincipal', formatPhone(e.target.value))}
              placeholder="(11) 99999-9999"
              className={getInputClassName('telefonePrincipal')}
            />
          </div>

          <div>
            <Label htmlFor="telefoneSecundario" className="text-base font-semibold">Telefone Secundário</Label>
            <Input
              id="telefoneSecundario"
              value={formData.telefoneSecundario}
              onChange={(e) => handleInputChange('telefoneSecundario', formatPhone(e.target.value))}
              placeholder="(11) 99999-9999"
              className="totem-input mt-2"
            />
          </div>
        </div>
      </div>

      {/* Endereço */}
      <div className="totem-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-6 h-6 text-warning" />
          <h3 className="text-xl font-bold">Endereço</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="cep" className="text-base font-semibold">CEP *</Label>
            <Input
              id="cep"
              value={formData.cep}
              onChange={(e) => handleInputChange('cep', formatCEP(e.target.value))}
              placeholder="00000-000"
              className={getInputClassName('cep')}
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="endereco" className="text-base font-semibold">Endereço *</Label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={(e) => handleInputChange('endereco', e.target.value)}
              className={getInputClassName('endereco')}
            />
          </div>

          <div>
            <Label htmlFor="numero" className="text-base font-semibold">Número *</Label>
            <Input
              id="numero"
              value={formData.numero}
              onChange={(e) => handleInputChange('numero', e.target.value)}
              className={getInputClassName('numero')}
            />
          </div>

          <div>
            <Label htmlFor="complemento" className="text-base font-semibold">Complemento</Label>
            <Input
              id="complemento"
              value={formData.complemento}
              onChange={(e) => handleInputChange('complemento', e.target.value)}
              placeholder="Apto, Sala, etc."
              className="totem-input mt-2"
            />
          </div>

          <div>
            <Label htmlFor="bairro" className="text-base font-semibold">Bairro *</Label>
            <Input
              id="bairro"
              value={formData.bairro}
              onChange={(e) => handleInputChange('bairro', e.target.value)}
              className={getInputClassName('bairro')}
            />
          </div>

          <div>
            <Label htmlFor="cidade" className="text-base font-semibold">Cidade *</Label>
            <Input
              id="cidade"
              value={formData.cidade}
              onChange={(e) => handleInputChange('cidade', e.target.value)}
              className={getInputClassName('cidade')}
            />
          </div>

          <div>
            <Label htmlFor="estado" className="text-base font-semibold">Estado *</Label>
            <Input
              id="estado"
              value={formData.estado}
              onChange={(e) => handleInputChange('estado', e.target.value)}
              placeholder="SP"
              className={getInputClassName('estado')}
            />
          </div>

          <div>
            <Label htmlFor="nomeLocal" className="text-base font-semibold">Nome do Local *</Label>
            <Input
              id="nomeLocal"
              value={formData.nomeLocal}
              onChange={(e) => handleInputChange('nomeLocal', e.target.value)}
              placeholder="Matriz, Filial, etc."
              className={getInputClassName('nomeLocal')}
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="pontosReferencia" className="text-base font-semibold">Pontos de Referência</Label>
            <Input
              id="pontosReferencia"
              value={formData.pontosReferencia}
              onChange={(e) => handleInputChange('pontosReferencia', e.target.value)}
              placeholder="Próximo ao shopping, em frente ao banco..."
              className="totem-input mt-2"
            />
          </div>
        </div>
      </div>

      {/* Botão Enviar */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={handleSubmit}
          className="totem-button totem-button-success px-12"
        >
          <Send className="w-6 h-6 mr-3" />
          Enviar Solicitação
        </Button>
      </div>
    </div>
  );
};