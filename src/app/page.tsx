// page.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Sparkles, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
// import { useUser } from '@clerk/nextjs'; // Desabilitado temporariamente

const currentYear = new Date().getFullYear();

export default function Home() {
  // const { isSignedIn } = useUser(); // Desabilitado temporariamente
  const router = useRouter();

  const handleStartNow = () => {
    // Acesso livre ao dashboard
    router.push('/dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <header className="mb-12">
        <h1 className="text-5xl font-headline font-bold text-primary mb-4">
          Bem-vindo à Leitura Criativa Interativa!
        </h1>
        <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
          Descubra um mundo de histórias e aprendizado divertido, feito sob medida para crianças explorarem a leitura de forma interativa e recompensadora.
        </p>
      </header>

      <div className="mb-16">
        <Image
          src="/asset/Gemini_Generated_Bunner800x400.png" // Certifique-se que este caminho está correto em `public/asset/`
          alt="Banner do Leitura Criativa Interativa"
          width={800}
          height={400}
          priority
          className="rounded-lg shadow-xl mx-auto"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="text-left shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center text-accent mb-2">
              <BookOpen className="w-8 h-8 mr-2" />
              <CardTitle className="font-headline">Exercícios Interativos</CardTitle>
            </div>
            <CardDescription>
              Mergulhe em histórias e atividades pensadas para desenvolver a leitura de forma lúdica e eficaz.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Nossos exercícios são adaptados para diferentes níveis, ajudando a superar dificuldades de aprendizado com apoio e diversão.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleStartNow} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Acessar Plataforma
            </Button>
          </CardFooter>
        </Card>

        <Card className="text-left shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center text-accent mb-2">
              <Sparkles className="w-8 h-8 mr-2" />
              <CardTitle className="font-headline">Recomendações IA</CardTitle>
            </div>
            <CardDescription>
              Descubra novos livros perfeitos para cada criança, com sugestões personalizadas pela nossa inteligência artificial.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Com base nos interesses e nível de leitura, nossa IA encontra as próximas aventuras literárias ideais.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleStartNow} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Acessar Plataforma
            </Button>
          </CardFooter>
        </Card>

        <Card className="text-left shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center text-accent mb-2">
              <Star className="w-8 h-8 mr-2" />
              <CardTitle className="font-headline">Leitura Divertida</CardTitle>
            </div>
            <CardDescription>
              Transforme a leitura em uma aventura com recompensas e feedback que motivam a cada página virada.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Aprender a ler nunca foi tão divertido! Com nosso sistema de gamificação, cada conquista é celebrada.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleStartNow} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Acessar Plataforma
            </Button>
          </CardFooter>
        </Card>
      </div>

      <footer className="mt-16 pt-8 border-t border-border">
        <p className="text-foreground/70">&copy; {currentYear} Leitura Criativa Interativa. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
