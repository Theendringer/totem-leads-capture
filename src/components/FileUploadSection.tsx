import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadSectionProps {
  onFilesChange: (files: File[]) => void;
}

export const FileUploadSection = ({ onFilesChange }: FileUploadSectionProps) => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).filter(file => {
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/', 'application/pdf', 'text/', '.doc', '.docx'];
      
      if (file.size > maxSize) {
        toast({
          title: "Arquivo muito grande",
          description: `${file.name} excede o limite de 5MB.`,
          variant: "destructive"
        });
        return false;
      }

      const isValidType = allowedTypes.some(type => 
        file.type.startsWith(type) || file.name.includes(type)
      );

      if (!isValidType) {
        toast({
          title: "Tipo de arquivo não suportado",
          description: `${file.name} não é um tipo de arquivo válido.`,
          variant: "destructive"
        });
        return false;
      }

      return true;
    });

    const updatedFiles = [...uploadedFiles, ...newFiles];
    setUploadedFiles(updatedFiles);
    onFilesChange(updatedFiles);

    if (newFiles.length > 0) {
      toast({
        title: "Arquivos adicionados",
        description: `${newFiles.length} arquivo(s) adicionado(s) com sucesso.`
      });
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="totem-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <Upload className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-bold">Documentos para Análise</h3>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Envie documentos que possam ajudar na análise de crédito (opcional)
      </p>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          isDragOver 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-lg font-semibold mb-2">
          Arraste arquivos aqui ou clique para selecionar
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Tipos aceitos: PDF, Imagens, Documentos de texto (máx. 5MB cada)
        </p>
        
        <input
          type="file"
          multiple
          className="hidden"
          id="file-upload"
          onChange={(e) => handleFileUpload(e.target.files)}
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
        />
        
        <Button
          variant="outline"
          className="totem-button"
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          Selecionar Arquivos
        </Button>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            Arquivos Anexados ({uploadedFiles.length})
          </h4>
          
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-accent/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          💡 <strong>Dica:</strong> Documentos como contrato social, extratos bancários, 
          balanços financeiros podem acelerar sua análise de crédito.
        </p>
      </div>
    </div>
  );
};