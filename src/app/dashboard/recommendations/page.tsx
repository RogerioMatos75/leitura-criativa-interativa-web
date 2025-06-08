'use client';

import type { GenerateReadingRecommendationsInput, GenerateReadingRecommendationsOutput } from '@/ai/flows/generate-reading-recommendations';
import { generateReadingRecommendations } from '@/ai/flows/generate-reading-recommendations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles, BookMarked } from 'lucide-react';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  readingLevel: z.string().min(1, "Nível de leitura é obrigatório"),
  interests: z.string().min(3, "Interesses devem ter pelo menos 3 caracteres").max(100, "Interesses devem ter no máximo 100 caracteres"),
  age: z.coerce.number().min(3, "Idade mínima é 3 anos").max(18, "Idade máxima é 18 anos"),
});

type RecommendationFormValues = z.infer<typeof formSchema>;

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      readingLevel: '',
      interests: '',
      age: 7,
    },
  });

  const onSubmit: SubmitHandler<RecommendationFormValues> = async (data) => {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const result: GenerateReadingRecommendationsOutput = await generateReadingRecommendations(data);
      if (result.recommendations && result.recommendations.length > 0) {
        setRecommendations(result.recommendations);
        toast({
          title: "Recomendações Geradas!",
          description: "Confira as sugestões de leitura abaixo.",
        });
      } else {
        setRecommendations([]);
        toast({
          title: "Nenhuma recomendação encontrada",
          description: "Tente ajustar os critérios de busca.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error generating recommendations:", error);
      toast({
        title: "Erro ao gerar recomendações",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Sparkles className="w-10 h-10 mr-3 text-primary" />
        <h1 className="text-4xl font-headline font-bold text-primary">Recomendações Personalizadas</h1>
      </div>
      <p className="text-lg text-foreground/80 mb-6">
        Preencha os dados abaixo para que nossa IA encontre os livros perfeitos para você!
      </p>

      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Encontre sua Próxima Aventura</CardTitle>
          <CardDescription>Nos diga um pouco sobre seus gostos e nível de leitura.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idade da Criança</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 7" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="readingLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nível de Leitura</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Selecione o nível" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Iniciante (Começando a ler)</SelectItem>
                        <SelectItem value="intermediate">Intermediário (Lê frases simples)</SelectItem>
                        <SelectItem value="advanced">Avançado (Lê com fluidez)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interesses</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: dinossauros, espaço, magia" {...field} className="bg-background" />
                    </FormControl>
                    <FormDescription>
                      Separe por vírgulas (ex: animais, aventura, mistério).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Gerar Recomendações
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {recommendations && (
        <div className="mt-10">
          <h2 className="text-3xl font-headline font-semibold mb-6 text-center text-primary">Livros Recomendados para Você!</h2>
          {recommendations.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((bookTitle, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center font-headline">
                      <BookMarked className="w-6 h-6 mr-2 text-accent" />
                      {bookTitle}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={`https://placehold.co/300x200.png?text=${encodeURIComponent(bookTitle.substring(0,15))}`}
                      alt={`Capa do livro ${bookTitle}`}
                      data-ai-hint="book cover"
                      width={300}
                      height={200}
                      className="rounded-md mb-4 w-full object-cover aspect-[3/2]"
                    />
                    <p className="text-sm text-muted-foreground">
                      Esta é uma ótima escolha baseada nos seus interesses e nível de leitura. Boa leitura!
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                       Quero Ler!
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-foreground/70">
              Nenhum livro encontrado com esses critérios. Tente refinar sua busca!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
