import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RewardBadge from '@/components/profile/RewardBadge';
import { UserCircle, Edit3, Award, BarChart2 } from 'lucide-react';

// Mock data
const userProfile = {
  name: 'Aluno Exemplo',
  email: 'aluno@exemplo.com',
  avatarUrl: 'https://placehold.co/150x150.png',
  avatarHint: 'profile picture',
  points: 1250,
  level: 'Explorador Literário',
  joinDate: '01/03/2024',
};

const rewards = [
  { title: 'Leitor Iniciante', description: 'Completou 5 exercícios.', iconType: 'star' as const, achieved: true },
  { title: 'Mestre dos Contos', description: 'Completou 10 histórias.', iconType: 'award' as const, achieved: true },
  { title: 'Quiz Expert', description: 'Acertou 20 perguntas.', iconType: 'shield' as const, achieved: false },
  { title: 'Aventureiro Literário', description: 'Explorou 3 gêneros diferentes.', iconType: 'star' as const, achieved: true },
  { title: 'Super Leitor', description: 'Completou 25 exercícios.', iconType: 'award' as const, achieved: false },
];

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <UserCircle className="w-10 h-10 mr-3 text-primary" />
        <h1 className="text-4xl font-headline font-bold text-primary">Meu Perfil</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 shadow-xl">
          <CardHeader className="items-center text-center">
            <Image
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              data-ai-hint={userProfile.avatarHint}
              width={120}
              height={120}
              className="rounded-full mb-4 border-4 border-primary shadow-md"
            />
            <CardTitle className="text-2xl font-headline">{userProfile.name}</CardTitle>
            <CardDescription className="text-accent">{userProfile.level}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-foreground/80 space-y-3">
            <p><strong>Email:</strong> {userProfile.email}</p>
            <p><strong>Membro desde:</strong> {userProfile.joinDate}</p>
            <Button variant="outline" className="w-full mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Edit3 className="mr-2 h-4 w-4" /> Editar Perfil
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-xl">
          <CardHeader>
            <div className="flex items-center">
              <BarChart2 className="w-7 h-7 mr-2 text-accent" />
              <CardTitle className="text-2xl font-headline">Meu Progresso</CardTitle>
            </div>
            <CardDescription>Acompanhe suas conquistas e pontos!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-primary/10 p-6 rounded-lg mb-6 text-center">
              <p className="text-lg text-primary font-semibold">Pontos Totais</p>
              <p className="text-5xl font-bold text-accent">{userProfile.points}</p>
            </div>

            <div>
              <h3 className="text-xl font-headline font-semibold mb-4 text-primary flex items-center">
                <Award className="mr-2 h-6 w-6 text-accent"/> Minhas Medalhas
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {rewards.map((reward, index) => (
                  <RewardBadge
                    key={index}
                    title={reward.title}
                    description={reward.description}
                    iconType={reward.iconType}
                    achieved={reward.achieved}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
