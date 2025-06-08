'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react';

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  questionText: string;
  options: QuizOption[];
  correctAnswerId: string;
}

interface QuizComponentProps {
  questions: QuizQuestion[];
}

export default function QuizComponent({ questions }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswerId;
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  if (quizFinished) {
    return (
      <Card className="w-full max-w-lg mx-auto shadow-xl my-8">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center text-primary">Quiz Finalizado!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-xl mb-4">Sua pontuação: {score} de {questions.length}</p>
          {score / questions.length >= 0.7 ? (
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          ) : (
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          )}
          <p className="text-foreground/80">
            {score / questions.length >= 0.7 ? "Parabéns! Você mandou muito bem!" : "Continue praticando para melhorar!"}
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => { /* Reset quiz or navigate away */ setCurrentQuestionIndex(0); setScore(0); setQuizFinished(false); setShowFeedback(false); setSelectedAnswer(null);}} className="w-full bg-primary text-primary-foreground">
            Tentar Novamente
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl my-8">
      <CardHeader>
        <CardTitle className="text-xl font-headline text-primary">
          Pergunta {currentQuestionIndex + 1} de {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-6 text-foreground/90">{currentQuestion.questionText}</p>
        <RadioGroup onValueChange={setSelectedAnswer} value={selectedAnswer || ""} disabled={showFeedback}>
          {currentQuestion.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-3 mb-3 p-3 border rounded-md hover:bg-muted/50 transition-colors">
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className="flex-1 cursor-pointer text-base">
                {option.text}
              </Label>
              {showFeedback && option.id === selectedAnswer && (
                selectedAnswer === currentQuestion.correctAnswerId ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )
              )}
              {showFeedback && option.id === currentQuestion.correctAnswerId && option.id !== selectedAnswer && (
                 <CheckCircle className="w-5 h-5 text-green-500 opacity-70" />
              )}
            </div>
          ))}
        </RadioGroup>
        {showFeedback && (
          <div className={`mt-4 p-3 rounded-md text-sm ${selectedAnswer === currentQuestion.correctAnswerId ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {selectedAnswer === currentQuestion.correctAnswerId ? 'Correto!' : 'Incorreto. A resposta certa está marcada.'}
          </div>
        )}
      </CardContent>
      <CardFooter>
        {showFeedback ? (
          <Button onClick={handleNextQuestion} className="w-full bg-accent text-accent-foreground">
            Próxima Pergunta <ChevronRight className="ml-2 h-4 w-4"/>
          </Button>
        ) : (
          <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer} className="w-full bg-primary text-primary-foreground">
            Responder
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
