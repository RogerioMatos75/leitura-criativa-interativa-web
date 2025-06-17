// page.tsx
"use client";
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RewardBadge from '@/components/profile/RewardBadge';
import { UserCircle, Edit3, Award, BarChart2 } from 'lucide-react'; // LogOut removido se não usado diretamente
import { useEffect, useState } from 'react';
// import { useUser, UserButton } from "@clerk/nextjs"; // Desabilitado temporariamente

// Definindo o tipo para o perfil do usuário
interface UserProfile {
  avatarUrl?: string;
  name: string;
  level: string;
  email: string;
  joinDate?: string;
  points: number;
  rewards?: Array<{
    title: string;
    description: string;
    iconType: 'award' | 'star' | 'shield';
    achieved: boolean;
  }>;
}

export default function ProfilePage() {
  // const { isLoaded, isSignedIn, user } = useUser(); // Desabilitado temporariamente
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    // Simulação de dados do usuário - remover ao integrar com Clerk
    const simulatedUser = {
      fullName: "Usuário Exemplo",
      primaryEmailAddress: { emailAddress: "usuario@exemplo.com" },
      imageUrl: "https://placehold.co/150x150.png",
      createdAt: "2023-01-01T00:00:00Z",
    };

    setUserProfile({
      name: simulatedUser.fullName || "Usuário",
      email: simulatedUser.primaryEmailAddress?.emailAddress || "Email não disponível",
      avatarUrl: simulatedUser.imageUrl,
      level: "Iniciante", // Placeholder - será necessário buscar do seu backend
      points: 0, // Placeholder - será necessário buscar do seu backend
      joinDate: simulatedUser.createdAt ? new Date(simulatedUser.createdAt).toLocaleDateString('pt-BR') : "Data não disponível",
      rewards: [], // Placeholder - será necessário buscar do seu backend
    });
    setLoadingProfile(false);

    // Se !isLoaded, o useEffect será re-executado quando isLoaded mudar.
  }, []);

  if (loadingProfile) {
    return <div className="flex justify-center items-center h-screen"><p>Carregando perfil...</p></div>;
  }

  // if (!isSignedIn) {
  //   // Idealmente, o middleware do Clerk já deveria redirecionar,
  //   // mas é uma boa prática ter um fallback.
  //   // Você pode redirecionar usando useRouter ou mostrar uma mensagem.
  //   return <div className="flex justify-center items-center h-screen"><p>Você precisa estar logado para ver esta página.</p></div>;
  // }

  if (!userProfile) {
    return <div className="flex justify-center items-center h-screen"><p>Não foi possível carregar o perfil.</p></div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <UserCircle className="w-10 h-10 mr-3 text-primary" />
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">Meu Perfil</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 shadow-xl">
          <CardHeader className="items-center text-center">
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={userProfile.avatarUrl || 'https://placehold.co/150x150.png'} // Fallback se avatarUrl for undefined
                alt={userProfile.name}
                fill
                className="rounded-full border-4 border-primary shadow-md"
              />
            </div>
            <CardTitle className="text-2xl font-headline">{userProfile.name}</CardTitle>
            <CardDescription className="text-accent">{userProfile.level}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-foreground/80 space-y-3">
            <p><strong>Email:</strong> {userProfile.email}</p>
            <p><strong>Membro desde:</strong> {userProfile.joinDate}</p>
            {/* O UserButton do Clerk já oferece opções de gerenciamento de conta e sign out */}
            {/* <div className="mt-4 flex justify-center">
              <UserButton afterSignOutUrl="/" />
            </div> */}
            {/* Se precisar de um botão de editar perfil separado, você pode adicionar aqui */}
            {/* <Button variant="outline" className="w-full mt-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Edit3 className="mr-2 h-4 w-4" /> Editar Perfil (Funcionalidade Futura)
            </Button> */}
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
                <Award className="mr-2 h-6 w-6 text-accent" /> Minhas Medalhas
              </h3>
              {userProfile.rewards && userProfile.rewards.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {userProfile.rewards.map((reward, index) => (
                    <RewardBadge
                      key={index}
                      title={reward.title}
                      description={reward.description}
                      iconType={reward.iconType}
                      achieved={reward.achieved}
                    />
                  ))}
                </div>
              ) : (<p className="text-foreground/60">Você ainda não possui medalhas. Continue explorando!</p>)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
