import { Award, Star, ShieldCheck } from 'lucide-react';

interface RewardBadgeProps {
  title: string;
  description: string;
  iconType: 'award' | 'star' | 'shield';
  achieved: boolean;
}

export default function RewardBadge({ title, description, iconType, achieved }: RewardBadgeProps) {
  const Icon = iconType === 'award' ? Award : iconType === 'star' ? Star : ShieldCheck;
  const colorClass = achieved ? 'text-accent' : 'text-muted-foreground opacity-50';
  const bgColorClass = achieved ? 'bg-accent/10' : 'bg-muted/30';

  return (
    <div className={`flex flex-col items-center p-4 border rounded-lg ${bgColorClass} ${achieved ? 'shadow-md' : ''} transition-all`}>
      <Icon className={`w-12 h-12 mb-3 ${colorClass}`} />
      <h3 className={`font-headline text-lg font-semibold ${achieved ? 'text-primary' : 'text-muted-foreground'}`}>{title}</h3>
      <p className={`text-xs text-center ${achieved ? 'text-foreground/70' : 'text-muted-foreground/70'}`}>{description}</p>
      {!achieved && <span className="mt-2 text-xs font-medium text-muted-foreground">(Bloqueado)</span>}
    </div>
  );
}
