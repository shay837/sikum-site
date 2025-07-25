
import React, { useState, useCallback } from 'react';
import type { BookSummary } from './types';
import { generateBookSummary } from './services/geminiService';
import SearchBar from './components/SearchBar';
import SummaryDisplay from './components/SummaryDisplay';
import BookOpenIcon from './components/icons/BookOpenIcon';

const App: React.FC = () => {
  const [summary, setSummary] = useState<BookSummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentBook, setCurrentBook] = useState<string | null>(null);

  const handleSearch = useCallback(async (bookTitle: string) => {
    if (!bookTitle.trim()) return;

    setIsLoading(true);
    setError(null);
    setSummary(null);
    setCurrentBook(bookTitle);

    try {
      const result = await generateBookSummary(bookTitle);
      setSummary(result);
    } catch (e) {
      console.error(e);
      setError('אירעה שגיאה בעת יצירת התקציר. אנא נסה שוב מאוחר יותר.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-brand-background flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <header className="w-full max-w-4xl text-center mb-8">
        <div className="flex justify-center items-center gap-4 mb-2">
          <BookOpenIcon className="h-10 w-10 text-brand-primary" />
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">סיכום ספרים מהיר</h1>
        </div>
        <p className="text-brand-subtle text-lg" dir="rtl">
          הבנת מהות הספרים ב-10 דקות. אידיאלי לסטודנטים, לומדים ואנשים עסוקים.
        </p>
      </header>

      <main className="w-full max-w-3xl flex-grow">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        
        <div className="mt-8">
          <SummaryDisplay
            summary={summary}
            isLoading={isLoading}
            error={error}
            bookTitle={currentBook}
          />
        </div>
      </main>

      <footer className="w-full max-w-4xl text-center mt-12 py-4 border-t border-gray-700">
        <p className="text-brand-subtle text-sm">&copy; {new Date().getFullYear()} Book Summarizer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
