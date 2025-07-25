
import React from 'react';
import type { BookSummary } from '../types';
import Loader from './Loader';
import LightBulbIcon from './icons/LightBulbIcon';
import SparklesIcon from './icons/SparklesIcon';
import BookOpenIcon from './icons/BookOpenIcon';

interface SummaryDisplayProps {
  summary: BookSummary | null;
  isLoading: boolean;
  error: string | null;
  bookTitle: string | null;
}

const WelcomeMessage: React.FC = () => (
    <div className="text-center p-8 bg-brand-surface rounded-lg border border-gray-700">
        <BookOpenIcon className="mx-auto h-12 w-12 text-brand-subtle mb-4"/>
        <h2 className="text-2xl font-bold text-white" dir="rtl">ברוכים הבאים למסכם הספרים</h2>
        <p className="mt-2 text-brand-subtle" dir="rtl">
            הזינו שם של ספר בשורת החיפוש למעלה כדי לקבל תקציר, רעיונות מרכזיים ופרשנות מעמיקה.
        </p>
    </div>
);


const SummaryContent: React.FC<{ summary: BookSummary; bookTitle: string | null }> = ({ summary, bookTitle }) => (
    <div className="space-y-8 animate-fade-in" dir="rtl">
        {bookTitle && <h2 className="text-3xl font-bold text-center text-white">סיכום עבור: {bookTitle}</h2>}
        
        <div className="p-6 bg-brand-surface rounded-lg border border-gray-700 shadow-lg">
            <h3 className="flex items-center gap-3 text-2xl font-semibold text-brand-primary mb-4">
                <BookOpenIcon className="h-7 w-7" />
                תקציר הספר
            </h3>
            <p className="text-brand-text leading-relaxed whitespace-pre-wrap">{summary.summary}</p>
        </div>

        <div className="p-6 bg-brand-surface rounded-lg border border-gray-700 shadow-lg">
            <h3 className="flex items-center gap-3 text-2xl font-semibold text-brand-primary mb-4">
                <LightBulbIcon className="h-7 w-7" />
                רעיונות מרכזיים
            </h3>
            <ul className="list-disc list-inside space-y-2 text-brand-text">
                {summary.keyIdeas.map((idea, index) => (
                    <li key={index}>{idea}</li>
                ))}
            </ul>
        </div>

        <div className="p-6 bg-brand-surface rounded-lg border border-gray-700 shadow-lg">
            <h3 className="flex items-center gap-3 text-2xl font-semibold text-brand-primary mb-4">
                <SparklesIcon className="h-7 w-7" />
                פרשנות ספרותית-רוחנית
            </h3>
            <p className="text-brand-text leading-relaxed whitespace-pre-wrap">{summary.interpretation}</p>
        </div>
    </div>
);


const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary, isLoading, error, bookTitle }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-900/20 border border-red-500/50 rounded-lg text-red-300" dir="rtl">
        <h2 className="text-xl font-bold">שגיאה</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (summary) {
    return <SummaryContent summary={summary} bookTitle={bookTitle} />;
  }

  return <WelcomeMessage />;
};

export default SummaryDisplay;
