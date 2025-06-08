import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <SettingsIcon className="w-10 h-10 mr-3 text-primary" />
        <h1 className="text-4xl font-headline font-bold text-primary">Configurações</h1>
      </div>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Configurações da Conta</CardTitle>
          <CardDescription>Gerencie suas preferências e informações da conta.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-foreground/80">
            Esta página está em construção. Em breve, você poderá personalizar suas configurações aqui!
          </p>
          {/* Placeholder for settings options */}
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Notificações</h3>
              <p className="text-sm text-muted-foreground">Ajuste suas preferências de notificação.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Preferências de Leitura</h3>
              <p className="text-sm text-muted-foreground">Configure o tamanho da fonte, tema, etc.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Privacidade</h3>
              <p className="text-sm text-muted-foreground">Gerencie suas configurações de privacidade.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
