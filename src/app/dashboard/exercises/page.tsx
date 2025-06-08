import ExerciseCard from '@/components/exercises/ExerciseCard';
import { BookOpen } from 'lucide-react';

const exercises = [
  {
    id: '1',
    title: 'A Aventura na Floresta Mágica',
    description: 'Ajude o esquilo Tito a encontrar o caminho de volta para casa através da floresta encantada, lendo as pistas e resolvendo os enigmas.',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'magic forest cartoon',
    level: 'Fácil' as 'Fácil' | 'Médio' | 'Difícil',
  },
  {
    id: '2',
    title: 'O Mistério do Planeta Distante',
    description: 'Viaje com a astronauta Luna para desvendar os segredos de um planeta alienígena, decifrando mensagens e compreendendo novas culturas.',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'space planet cartoon',
    level: 'Médio' as 'Fácil' | 'Médio' | 'Difícil',
  },
  {
    id: '3',
    title: 'O Tesouro Perdido do Capitão Barbanegra',
    description: 'Siga o mapa do tesouro e ajude os jovens piratas a encontrar o ouro escondido, interpretando enigmas e passagens antigas.',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'pirate treasure cartoon',
    level: 'Difícil' as 'Fácil' | 'Médio' | 'Difícil',
  },
   {
    id: '4',
    title: 'A Corrida dos Animais Falantes',
    description: 'Participe de uma emocionante corrida na savana com animais que falam! Leia as regras e ajude seu animal favorito a vencer.',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'animal race cartoon',
    level: 'Fácil' as 'Fácil' | 'Médio' | 'Difícil',
  },
  {
    id: '5',
    title: 'A Escola de Magia e Seus Segredos',
    description: 'Explore uma escola de magia cheia de feitiços e mistérios. Leia os livros de magia e descubra segredos antigos.',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'magic school cartoon',
    level: 'Médio' as 'Fácil' | 'Médio' | 'Difícil',
  },
];

export default function ExercisesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <BookOpen className="w-10 h-10 mr-3 text-primary" />
        <h1 className="text-4xl font-headline font-bold text-primary">Nossos Exercícios de Leitura</h1>
      </div>
      <p className="text-lg text-foreground/80 mb-10">
        Escolha uma história abaixo para começar sua aventura de aprendizado e diversão!
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            id={exercise.id}
            title={exercise.title}
            description={exercise.description}
            imageUrl={exercise.imageUrl}
            imageHint={exercise.imageHint}
            level={exercise.level}
          />
        ))}
      </div>
    </div>
  );
}
