import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// ✅ OpenRouter API Configuration
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const SITE_URL = import.meta.env.VITE_SITE_URL;
const SITE_NAME = import.meta.env.VITE_SITE_NAME;

function OpenRouterAI() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        try {
            const enhancedPrompt = `You are an e-waste management specialist AI assistant for Green Grid. 
            Please provide helpful, expert advice about: ${prompt}. 
            Focus exclusively on e-waste recycling, electronic disposal, sustainable practices, 
            finding recycling centers, and environmental impact of electronics. 
            Do not answer questions unrelated to e-waste management and recycling.
            
            Format your response with:
            - Use a combination of paragraphs and bullet points as appropriate
            - For step-by-step instructions or lists, use bullet points
            - For explanations and descriptions, use paragraphs
            - Use **double asterisks** around important points for bold formatting
            - Use *single asterisks* around less important points for italic formatting  
            - Keep the response educational and professional
            - Do not include "Green Grid" or any company names in the response
            - No tables, no markdown headers, no hashtags, no horizontal lines`;

            const apiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                    "HTTP-Referer": SITE_URL,
                    "X-Title": SITE_NAME,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "openai/gpt-oss-20b:free",
                    "messages": [
                        {
                            "role": "user",
                            "content": enhancedPrompt
                        }
                    ]
                })
            });

            if (!apiResponse.ok) {
                throw new Error(`HTTP error! status: ${apiResponse.status}`);
            }

            const data = await apiResponse.json();

            if (data.choices && data.choices[0] && data.choices[0].message) {
                let cleanResponse = data.choices[0].message.content;

                // Remove unwanted phrases
                cleanResponse = cleanResponse.replace(/Green Grid\s*–?\s*Your E.?Waste Management Partner/gi, '');
                cleanResponse = cleanResponse.replace(/Expert guidance on recycling, sustainable disposal, and locating trusted centers/gi, '');
                cleanResponse = cleanResponse.replace(/Green Grid/gi, '');
                cleanResponse = cleanResponse.replace(/---+/g, ''); // Remove horizontal lines

                // Remove markdown headers but keep formatting symbols
                cleanResponse = cleanResponse.replace(/##\s+/g, '');
                cleanResponse = cleanResponse.replace(/#\s+/g, '');

                setResponse(cleanResponse.trim());
            } else {
                throw new Error('No response from AI');
            }
        } catch (error) {
            console.error("Error:", error);
            setResponse("Error: Unable to get response. Please try again later.");
        }
        setLoading(false);
    };

    // Function to clear both prompt and response
    const handleClear = () => {
        setPrompt("");
        setResponse("");
    };

    // Handle Enter key press in textarea
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    // Function to format text with ** and * into proper HTML
    const formatResponse = (text) => {
        // Convert **bold** to <strong>bold</strong>
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Convert *italic* to <em>italic</em> (but not bullet points)
        formattedText = formattedText.replace(/(^|[^*])\*(?!\s)([^*]+)(?!\s)\*/g, '$1<em>$2</em>');
        // Convert bullet points
        formattedText = formattedText.replace(/\n\s*\*\s+/g, '\n<span class="bullet">•</span> ');
        formattedText = formattedText.replace(/\n\s*-\s+/g, '\n<span class="bullet">•</span> ');

        return { __html: formattedText };
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 sm:py-16">
                <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-5 sm:p-7">
                    {/* Green Grid Styled Header */}
                    <div className="text-center mb-6 sm:mb-7">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                            Green Grid AI Assistant
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600">
                            Get expert guidance on e-waste management and recycling
                        </p>
                    </div>

                    {/* Input Section */}
                    <div className="mb-6 sm:mb-7">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm sm:text-base font-medium text-gray-700">
                                Ask about e-waste, recycling, or sustainable practices
                            </label>
                            {(prompt || response) && (
                                <button
                                    onClick={handleClear}
                                    className="text-xs sm:text-sm text-red-500 hover:text-red-700 flex items-center transition-colors duration-200"
                                >
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Clear All
                                </button>
                            )}
                        </div>
                        <textarea
                            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none text-gray-700 text-sm sm:text-base"
                            rows="4"
                            placeholder="Example: How can I properly dispose of old smartphones? What are the benefits of e-waste recycling? Where can I find e-waste recycling centers near me? (Press Enter to get expert advice)"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            💡 Press <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Enter</kbd> to get expert advice • Press <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Shift + Enter</kbd> for new line
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4 mb-6 sm:mb-7">
                        <button
                            onClick={handleSubmit}
                            disabled={loading || !prompt.trim()}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 px-4 sm:px-5 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Getting Expert Advice...
                                </span>
                            ) : "Get Expert Advice"}
                        </button>

                        {response && (
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(response);
                                    alert('Expert advice copied to clipboard!');
                                }}
                                className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
                                title="Copy expert advice"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy
                            </button>
                        )}
                    </div>

                    {/* Response Section */}
                    {response && (
                        <div className="mt-6 sm:mt-7 p-4 sm:p-6 bg-gray-50 border border-gray-200 rounded-lg">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                                    💡 Expert Advice
                                </h2>
                                <button
                                    onClick={() => setResponse("")}
                                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                    title="Clear expert advice"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div
                                className="text-gray-700 leading-relaxed whitespace-pre-wrap response-content text-sm sm:text-base"
                                dangerouslySetInnerHTML={formatResponse(response)}
                            />
                        </div>
                    )}

                    {/* Tips Section */}
                    {!response && (
                        <div className="mt-6 sm:mt-7 bg-gray-100 p-4 sm:p-5 rounded-lg">
                            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-3">
                                💡 Suggested Questions:
                            </h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-1.5 pl-4 text-sm sm:text-base">
                                <li>How to find nearest e-waste recycling centers?</li>
                                <li>What items are considered e-waste?</li>
                                <li>Benefits of proper e-waste disposal</li>
                                <li>How to reduce electronic carbon footprint?</li>
                                <li>Eco-friendly electronics options</li>
                                <li>How does Green Grid's reward system work?</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Add custom styling for formatted content */}
            <style>{`
                .response-content {
                    line-height: 1.7;
                }
                .response-content strong {
                    color: #1a202c;
                    font-weight: 600;
                    background-color: #f0fff4;
                    padding: 2px 4px;
                    border-radius: 3px;
                }
                .response-content em {
                    color: #4a5568;
                    font-style: italic;
                }
                .response-content .bullet {
                    display: inline-block;
                    width: 1.2em;
                    color: #059669;
                    font-weight: bold;
                }
                .response-content ul, .response-content ol {
                    margin-left: 1.5rem;
                    margin-top: 0.5rem;
                    margin-bottom: 0.5rem;
                }
                .response-content li {
                    margin-bottom: 0.25rem;
                }
                kbd {
                    font-family: inherit;
                }
            `}</style>

            <Footer />
        </>
    );
}

export default OpenRouterAI;