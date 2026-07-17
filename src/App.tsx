/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { SurveyWizard } from './components/SurveyWizard';
import { SuccessScreen } from './components/SuccessScreen';
import { SurveyResponses } from './types';

type AppState = 'survey' | 'success';

export default function App() {
  const [appState, setAppState] = useState<AppState>('survey');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (responses: SurveyResponses) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('entry.93162063', responses.hoursStudied);
      formData.append('entry.1867136170', responses.studyHabits);
      formData.append('entry.1872850428', responses.testReflection);
      formData.append('entry.848453584', responses.readingStrategy);
      formData.append('entry.156699759', responses.recallPractice);
      formData.append('entry.1704821583', responses.failedStudyStrategy);

      await fetch(
        'https://docs.google.com/forms/d/e/1FAIpQLSffjJVi5SN_7IKJQCtQ8TDqOjRBt8lJPS0vZxRe38LgQsv4wQ/formResponse',
        {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        }
      );
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
      setAppState('success');
    }
  };

  const handleReset = () => {
    setAppState('survey');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center p-4 py-12">
        {appState === 'survey' && (
          <div className="w-full max-w-2xl mx-auto mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Student Academic Excellence Survey
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              We are collecting these insights to better understand student study habits and challenges. Your honest feedback will directly help us design more effective academic support systems, workshops, and resources to improve overall educational outcomes.
            </p>
          </div>
        )}

        <div className="w-full max-w-4xl mx-auto">
          {appState === 'survey' && <SurveyWizard onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
          {appState === 'success' && <SuccessScreen onReset={handleReset} />}
        </div>
      </div>
      
      <div className="py-6 text-center animate-in fade-in duration-500 delay-300">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          From the office of the
        </p>
        <p className="text-sm font-semibold text-gray-500 mt-1">
          Director of Academics BIOSSA
        </p>
      </div>
    </div>
  );
}
