'use client';

import React from "react";
import Header from '@/components/features/aventura-criativa/components/Header';
import StoryCreator from '@/components/features/aventura-criativa/components/StoryCreator';
import PromptGenerator from '@/components/features/aventura-criativa/components/PromptGenerator';
import { SparklesIcon, PencilIcon } from '@/components/features/aventura-criativa/components/Icons';

const AventuraCriativaPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-200 via-indigo-200 to-pink-200 text-slate-800 flex flex-col items-center p-4 selection:bg-yellow-300 selection:text-yellow-900">
            <Header />
            <main className="container mx-auto mt-6 w-full max-w-4xl space-y-12">
                <section
                    id="story-creator"
                    className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 md:p-8 transform hover:scale-[1.01] transition-transform duration-300"
                    aria-labelledby="story-creator-title"
                >
                    <div className="flex items-center mb-6">
                        <SparklesIcon className="w-10 h-10 text-pink-500 mr-3" />
                        <h2 id="story-creator-title" className="text-3xl font-bold text-pink-600">Crie sua História Mágica!</h2>
                    </div>
                    <StoryCreator />
                </section>

                <section
                    id="prompt-generator"
                    className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 md:p-8 transform hover:scale-[1.01] transition-transform duration-300"
                    aria-labelledby="prompt-generator-title"
                >
                    <div className="flex items-center mb-6">
                        <PencilIcon className="w-10 h-10 text-indigo-500 mr-3" />
                        <h2 id="prompt-generator-title" className="text-3xl font-bold text-indigo-600">Ideias para Escrever</h2>
                    </div>
                    <PromptGenerator />
                </section>
            </main>
            <footer className="py-8 mt-12 text-center text-slate-600">
                <p>&copy; {new Date().getFullYear()} Aventura Criativa. Feito com ❤️ para pequenos escritores!</p>
            </footer>
        </div>
    );
};

export default AventuraCriativaPage;
