import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Search } from 'lucide-react';

const VoiceChat = () => {
    const navigate = useNavigate();
    const [listening, setListening] = useState(false);
    const [recognizedText, setRecognizedText] = useState('Actually, I was registering for card can you tell me what do i need? i have almost all the required documents but there is an error in the login and registration');
    const [language, setLanguage] = useState('English'); // Placeholder for detected/selected language

    const startListening = () => {
        setListening(true);
        // NOTE: In a real PWA, you would use the Web Speech API (SpeechRecognition)
        // or a dedicated STT service like Google Cloud Speech-to-Text via the backend.
        setTimeout(() => {
            setListening(false);
            // Simulate recognized text, with multi-language capability
            // For Hindi: setRecognizedText("नमस्ते, मुझे किसान योजना के बारे में जानकारी चाहिए।");
            setRecognizedText("Actually, I was registering for card can you tell me what do i need? i have almost all the required documents but there is an error in the login and registration");
            setLanguage('Hindi (Simulated)');
        }, 3000);
    };

    const submitVoiceQuery = () => {
        // Navigate back to home and populate the prompt field
        // This is a simple mock. In a real app, this would submit to the AI.
        navigate('/home', { state: { initialPrompt: recognizedText } });
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Recognized Text Area */}
            <div className="flex-grow flex flex-col justify-start p-8 overflow-y-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 hidden lg:block">Voice Assistant</h1>
                {recognizedText && (
                    <p className="text-3xl lg:text-4xl font-light text-[#7c5b4e] leading-snug max-w-3xl mx-auto">
                        {/* Highlighted text based on your design iPhone 16 - 4.png */}
                        <span className="font-semibold text-gray-800">Actually, I was registering for card</span> can you tell me what do i need? <span className="font-semibold text-gray-800">i have almost all the required documents</span> but there is an error in the login and registration
                    </p>
                )}
            </div>

            {/* Listening Interface */}
            <div className="flex flex-col items-center p-8 bg-white shadow-inner border-t">
                {listening && (
                    <div className="mb-6 text-gov-brown-light font-medium flex items-center">
                        <div className="animate-pulse mr-2 w-2 h-2 bg-gov-brown-light rounded-full"></div>
                        Listening... ({language})
                    </div>
                )}
                
                {/* Main Mic Button */}
                <div className="relative">
                    <button
                        onClick={startListening}
                        className={`w-28 h-28 flex items-center justify-center rounded-full bg-white shadow-2xl transition-all duration-300 ${listening ? 'ring-8 ring-gov-amber/50' : 'ring-0'}`}
                        disabled={listening}
                    >
                        <Mic className={`w-12 h-12 ${listening ? 'text-red-600' : 'text-gray-800'}`} strokeWidth={1.5}/>
                    </button>
                    {listening && (
                        <div className="absolute inset-0 bg-gov-amber opacity-50 rounded-full animate-ping-slow"></div>
                    )}
                </div>

                {/* Control Buttons */}
                <div className="mt-8 flex justify-around w-full max-w-sm">
                    <button onClick={submitVoiceQuery} className="p-4 bg-gov-brown-light text-white rounded-xl shadow-md hover:bg-gov-brown-dark transition">
                        <Search className="w-6 h-6" />
                    </button>
                    <div className="w-16"></div> {/* Spacer to center the main button */}
                    <button onClick={() => alert("Image/Document upload requested. This would be processed via the backend.")} className="p-4 bg-gray-200 rounded-xl hover:bg-gray-300 transition">
                        <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.865-1.297a2 2 0 011.664-.89h1.832a2 2 0 011.664.89l.865 1.297a2 2 0 001.664.89H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VoiceChat;