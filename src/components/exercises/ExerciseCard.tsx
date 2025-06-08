import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

interface ExerciseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  level: 'Fácil' | 'Médio' | 'Difícil';
}

export default function ExerciseCard({ id, title, description, imageUrl, imageHint, level }: ExerciseCardProps) {
  const levelColor = level === 'Fácil' ? 'text-green-500' : level === 'Médio' ? 'text-yellow-500' : 'text-red-500';

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      <CardHeader className="p-0">
        <Image
          src={imageUrl}
          alt={title}
          data-ai-hint={imageHint}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="font-headline text-xl mb-1 text-primary">{title}</CardTitle>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-opacity-20 ${level === 'Fácil' ? 'bg-green-100 text-green-700' : level === 'Médio' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
            {level}
          </span>
        </div>
        <CardDescription className="text-sm text-foreground/70 line-clamp-3">{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto">
        <Link href={`/dashboard/exercises/${id}`} className="w-full">
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
            Começar Exercício <Zap className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
