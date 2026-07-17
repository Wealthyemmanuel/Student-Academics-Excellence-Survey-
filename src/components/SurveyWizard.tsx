import { useState } from 'react';
import { SurveyResponses } from '../types';
import { ChevronRight, ChevronLeft, Send } from 'lucide-react';

interface SurveyWizardProps {
  onSubmit: (responses: SurveyResponses) => void;
  isSubmitting?: boolean;
}

const QUESTIONS = [
  {
    id: 'hoursStudied',
    title: 'How many hours do you usually spend studying on a normal school day?',
    type: 'radio',
    required: true,
    options: ['0-1 hours', '1-2 hours', '2-4 hours', '4+ hours'],
  },
  {
    id: 'studyHabits',
    title: 'When you study, what do you usually do?',
    type: 'radio',
    required: true,
    options: ['Read silently', 'Read out loud', 'Write notes', 'Just look at the book'],
  },
  {
    id: 'testReflection',
    title: "Think of the last test you didn't do well on, even though you studied. What do you think went wrong?",
    type: 'textarea',
    required: false,
    placeholder: 'Share your thoughts here...',
  },
  {
    id: 'readingStrategy',
    title: "When you're reading and you hit a sentence you don't understand, what do you usually do?",
    type: 'radio',
    required: true,
    options: ['Skip it', 'Read it again', 'Stop and think about it', 'Ask someone', 'Just keep going'],
  },
  {
    id: 'recallPractice',
    title: 'Without looking at your books, write down 2 things you studied this week. What do you remember about them?',
    type: 'textarea',
    required: false,
    placeholder: '1. ...\n2. ...',
  },
  {
    id: 'failedStudyStrategy',
    title: "What's one thing you've tried to study better that didn't work?",
    type: 'textarea',
    required: false,
    placeholder: 'Share your experience...',
  }
];

export function SurveyWizard({ onSubmit, isSubmitting = false }: SurveyWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SurveyResponses>({
    hoursStudied: '',
    studyHabits: '',
    testReflection: '',
    readingStrategy: '',
    recallPractice: '',
    failedStudyStrategy: '',
  });

  const question = QUESTIONS[currentStep];
  const progress = Math.round((currentStep / QUESTIONS.length) * 100);

  const isCurrentStepValid = () => {
    if (question.required) {
      const value = formData[question.id as keyof SurveyResponses];
      return value !== undefined && value.trim() !== '';
    }
    return true;
  };

  const handleNext = () => {
    if (isCurrentStepValid()) {
      if (currentStep === QUESTIONS.length - 1) {
        onSubmit(formData);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleChange = (field: keyof SurveyResponses, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-medium text-gray-500">Question {currentStep + 1} of {QUESTIONS.length}</span>
          <span className="text-sm font-bold text-blue-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 min-h-[400px] flex flex-col animate-in slide-in-from-right-4 fade-in duration-300" key={currentStep}>
        
        <div className="flex-grow">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2 leading-tight">
            {question.title}
          </h2>
          {!question.required && (
            <p className="text-gray-400 mb-8 font-medium">Optional</p>
          )}
          {question.required && (
            <p className="text-blue-500 mb-8 font-medium text-sm">Required</p>
          )}

          <div className="mt-8">
            {question.type === 'radio' && (
              <div className="space-y-3">
                {question.options?.map((option) => (
                  <label 
                    key={option} 
                    className={`flex items-center p-4 rounded-xl cursor-pointer transition-all border-2 ${
                      formData[question.id as keyof SurveyResponses] === option 
                        ? 'border-blue-600 bg-blue-50/50' 
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={formData[question.id as keyof SurveyResponses] === option}
                      onChange={(e) => handleChange(question.id as keyof SurveyResponses, e.target.value)}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-lg text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {question.type === 'textarea' && (
              <textarea
                value={formData[question.id as keyof SurveyResponses]}
                onChange={(e) => handleChange(question.id as keyof SurveyResponses, e.target.value)}
                rows={5}
                placeholder={question.placeholder}
                className="w-full rounded-xl border-2 border-gray-100 shadow-sm focus:border-blue-600 focus:ring-0 bg-white p-4 text-lg resize-none transition-colors"
              />
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-100">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center px-4 py-2 text-gray-500 font-medium transition-colors ${
              currentStep === 0 ? 'invisible' : 'hover:text-gray-900'
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!isCurrentStepValid() || isSubmitting}
            className={`flex items-center px-8 py-3 rounded-xl font-semibold transition-all ${
              isCurrentStepValid() && !isSubmitting
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentStep === QUESTIONS.length - 1 ? (
              <>
                {isSubmitting ? 'Submitting...' : 'Submit'}
                {!isSubmitting && <Send className="w-5 h-5 ml-2" />}
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-5 h-5 ml-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
