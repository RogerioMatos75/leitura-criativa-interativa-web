import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, Lightbulb, UserCircle, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-headline font-bold mb-8 text-primary">Painel Principal</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center text-accent mb-2">
              <BookOpen className="w-10 h-10 mr-3" />
              <div>
                <CardTitle className="text-2xl font-headline">Exercícios Interativos</CardTitle>
                <CardDescription>Continue sua jornada de leitura.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Explore novas histórias e atividades para aprimorar suas habilidades.</p>
            <Link href="/dashboard/exercises">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Ver Exercícios <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center text-accent mb-2">
              <Lightbulb className="w-10 h-10 mr-3" />
              <div>
                <CardTitle className="text-2xl font-headline">Recomendações IA</CardTitle>
                <CardDescription>Descubra sua próxima leitura favorita.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Receba sugestões de livros personalizadas pela nossa IA.</p>
            <Link href="/dashboard/recommendations">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Obter Recomendações <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center text-accent mb-2">
              <UserCircle className="w-10 h-10 mr-3" />
              <div>
                <CardTitle className="text-2xl font-headline">Meu Perfil</CardTitle>
                <CardDescription>Acompanhe seu progresso e conquistas.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Veja seus pontos, medalhas e personalize suas informações.</p>
            <Link href="/dashboard/profile">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Acessar Perfil <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 p-6 bg-secondary rounded-lg shadow">
          <h2 className="text-2xl font-headline font-semibold mb-3 text-secondary-foreground">Dica do Dia!</h2>
          <p className="text-secondary-foreground/80">
            Lembre-se: ler um pouquinho todos os dias ajuda muito! Que tal escolher um livro novo hoje?
          </p>
      </div>
    </div>
  );
}
