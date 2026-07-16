import { CheckCircle } from 'lucide-react';

interface SuccessScreenProps {
  onReset: () => void;
}

export function SuccessScreen({ onReset }: SuccessScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="bg-green-100 p-4 rounded-full">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Thank You!</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Your responses to the Student Academic Excellence Survey have been recorded successfully.
        </p>
      </div>
      <button
        onClick={onReset}
        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit Another Response
      </button>
    </div>
  );
}
