import QuizComponent from '@/components/exercises/QuizComponent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Mock data, in a real app this would come from a database or API
const exercisesData = [
  {
    id: '1',
    title: 'A Aventura na Floresta Mágica',
    content: [
      "Era uma vez, em uma floresta densa e cheia de mistérios, um pequeno esquilo chamado Tito. Tito era muito curioso e adorava explorar.",
      "Um dia, enquanto seguia uma borboleta de asas brilhantes, Tito se afastou muito de sua árvore e se perdeu. O sol começava a se pôr e a floresta ficava escura e assustadora.",
      "Tito encontrou uma coruja sábia pousada em um galho. 'Dona Coruja,' disse Tito com a voz trêmula, 'você pode me ajudar a encontrar o caminho de volta para casa?'",
      "A coruja, com seus grandes olhos amarelos, respondeu: 'Claro, pequeno. Mas primeiro, você deve responder a uma pergunta: O que tem raízes que ninguém vê, é mais alto que as árvores, sobe, sobe e nunca cresce?'",
      "Tito pensou um pouco. Ele olhou para as árvores altas, para o céu escuro. 'Já sei!', exclamou ele. 'É uma montanha!'",
      "'Muito bem!', disse a coruja. 'Siga a trilha que leva à montanha mais alta e você encontrará o caminho para casa.' Tito agradeceu e partiu, sentindo-se mais corajoso.",
    ],
    imageUrl: 'https://placehold.co/600x300.png',
    imageHint: 'magic forest path',
    questions: [
      {
        id: 'q1',
        questionText: 'Qual animal Tito encontrou que o ajudou?',
        options: [
          { id: 'q1o1', text: 'Um coelho' },
          { id: 'q1o2', text: 'Uma coruja' },
          { id: 'q1o3', text: 'Um urso' },
        ],
        correctAnswerId: 'q1o2',
      },
      {
        id: 'q2',
        questionText: 'Qual era o enigma da coruja?',
        options: [
          { id: 'q2o1', text: 'O que é, o que é, cai em pé e corre deitado?' },
          { id: 'q2o2', text: 'O que tem raízes que ninguém vê, é mais alto que as árvores, sobe, sobe e nunca cresce?' },
          { id: 'q2o3', text: 'Qual é o animal que anda com as patas na cabeça?' },
        ],
        correctAnswerId: 'q2o2',
      },
       {
        id: 'q3',
        questionText: 'Para onde a coruja disse para Tito seguir?',
        options: [
          { id: 'q3o1', text: 'Para o rio mais próximo' },
          { id: 'q3o2', text: 'Para a clareira ensolarada' },
          { id: 'q3o3', text: 'Para a montanha mais alta' },
        ],
        correctAnswerId: 'q3o3',
      },
    ],
  },
  // Add more exercises if needed
];

export default function ExerciseDetailPage({ params }: { params: { id: string } }) {
  const exercise = exercisesData.find((ex) => ex.id === params.id);

  if (!exercise) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-destructive">Exercício não encontrado!</h1>
        <Link href="/dashboard/exercises">
          <Button variant="link" className="mt-4 text-primary">Voltar para os exercícios</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Link href="/dashboard/exercises" className="inline-flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="mr-2 h-5 w-5" />
        Voltar para todos os exercícios
      </Link>
      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="bg-primary/10 p-6">
          <CardTitle className="text-3xl font-headline text-primary">{exercise.title}</CardTitle>
          <CardDescription className="text-md text-foreground/70">Leia a história com atenção e responda às perguntas.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 md:flex">
          <div className="md:w-1/2 p-6">
            <Image
              src={exercise.imageUrl}
              alt={exercise.title}
              data-ai-hint={exercise.imageHint}
              width={600}
              height={300}
              className="rounded-lg shadow-md mb-6 w-full object-cover"
            />
            <ScrollArea className="h-[300px] border rounded-md p-4 bg-background">
              {exercise.content.map((paragraph, index) => (
                <p key={index} className="mb-4 text-lg leading-relaxed text-foreground/90">
                  {paragraph}
                </p>
              ))}
            </ScrollArea>
          </div>
          <div className="md:w-1/2 p-6 border-t md:border-t-0 md:border-l">
            <QuizComponent questions={exercise.questions} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateStaticParams() {
  return exercisesData.map((exercise) => ({
    id: exercise.id,
  }));
}
