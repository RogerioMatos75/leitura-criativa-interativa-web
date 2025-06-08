'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import ClientSignupForm from '@/components/ClientSignupForm'; // Importe o novo componente
export default function SignupPage() {
 return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-accent mb-4" />
          <CardTitle className="text-3xl font-headline">Crie sua Conta</CardTitle>
          <CardDescription>Junte-se à nossa comunidade de leitores e comece a explorar!</CardDescription>
        </CardHeader>
        {/* Use o componente ClientSignupForm aqui */}
        <ClientSignupForm />
        <CardFooter className="flex flex-col gap-4">
 <p className="text-sm text-center text-muted-foreground">
 Já tem uma conta?{" "}
 <Link href="/login" className="font-medium text-primary hover:underline">
 Faça login
 </Link>
 </p>
 </CardFooter>
      </Card>
    </div>
  );
}
