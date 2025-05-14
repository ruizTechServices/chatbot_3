import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white text-gray-900 p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <Image
            src="/24Hour-ai-logo-1.png" 
            alt="ChatVend logo"
            width={100}
            height={100}
            className="rounded-lg bg-red-600 p-1"
          />
          <h1 className="text-2xl font-bold text-red-600">24Hour AI</h1>
        </div>
        <nav className="hidden sm:flex gap-6">
          <a href="#features" className="text-red-600 hover:underline">Features</a>
          <a href="#pricing" className="text-red-600 hover:underline">Pricing</a>
          <a href="#faq" className="text-red-600 hover:underline">FAQ</a>
        </nav>
      </header>
      
      <main className="flex flex-col items-center justify-center text-center gap-8 py-12">
        <div className="max-w-3xl">
          <h2 className="text-4xl sm:text-6xl font-bold mb-6 text-red-600">
            Premium AI Chat
            <span className="block text-red-700">Just $1</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-800">
            Access multiple cutting-edge LLMs for 24 hours straight. 
            Like a vending machine for AI - insert a dollar, get unlimited conversations.
          </p>
        </div>
        
        <div className="relative w-full max-w-md aspect-[3/4] my-8">
          <div className="absolute inset-0 bg-red-100 rounded-xl backdrop-blur-sm"></div>
          <div className="absolute inset-2 bg-white rounded-lg border-2 border-red-200 flex flex-col">
            <div className="bg-red-600 p-4 rounded-t-lg flex justify-between items-center text-white">
              <span className="font-bold">24Hour AI</span>
              <span className="bg-white text-red-600 px-2 py-1 rounded-full text-sm font-bold">$1</span>
            </div>
            <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden">
              <div className="bg-gray-100 p-3 rounded-lg text-left text-sm">
                <p className="text-gray-600">User:</p>
                <p className="text-gray-900">What can you help me with today?</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg text-left text-sm">
                <p className="text-red-600">GPT-4:</p>
                <p className="text-gray-900">I can help with creative writing, coding problems, research questions, and more. What's on your mind?</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg text-left text-sm">
                <p className="text-red-600">Claude:</p>
                <p className="text-gray-900">I excel at thoughtful analysis and can assist with complex reasoning tasks. How can I help you today?</p>
              </div>
            </div>
            <div className="bg-gray-100 p-3 rounded-b-lg flex gap-2">
              <input type="text" placeholder="Ask anything..." className="flex-1 bg-white border border-gray-300 rounded p-2 text-sm" />
              <button className="bg-red-600 px-3 rounded text-white">→</button>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 flex-col sm:flex-row mt-6">
          <a
            className="rounded-full bg-red-600 text-white font-bold py-3 px-8 text-lg hover:bg-red-700 transition-colors"
            href="/signup"
          >
            Try for $1
          </a>
          <a
            className="rounded-full border-2 border-red-600 text-red-600 py-3 px-8 text-lg hover:bg-red-50 transition-colors"
            href="#learn-more"
          >
            Learn more
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 w-full max-w-5xl mx-auto px-4">
          <div className="bg-red-50 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 relative mb-3 sm:mb-4">
              <Image
                src="/multipleLLMs.png"
                alt="Multiple LLMs"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-red-600">Multiple LLMs</h3>
            <p className="text-sm sm:text-base text-gray-800">Access GPT-4, Claude, and more models with a single subscription</p>
          </div>
          <div className="bg-red-50 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 relative mb-3 sm:mb-4">
              <Image
                src="/24Hour-ai-logo-1.png"
                alt="24 Hours Access"
                fill
                className="object-contain bg-red-600 rounded-full p-1"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-red-600">24 Hours Access</h3>
            <p className="text-sm sm:text-base text-gray-800">Full day of unlimited conversations after your one-time payment</p>
          </div>
          <div className="bg-red-50 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 relative mb-3 sm:mb-4">
              <Image
                src="/banknote.png"
                alt="Just $1"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-red-600">Just $1</h3>
            <p className="text-sm sm:text-base text-gray-800">No hidden fees or subscriptions. Pay once and enjoy for 24 hours</p>
          </div>
        </div>
      </main>
      
      <footer className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-red-100">
        <p className="text-sm text-gray-600">© 2025 ruizTechServices,LLC. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="/terms" className="text-sm text-red-600 hover:underline">Terms</a>
          <a href="/privacy" className="text-sm text-red-600 hover:underline">Privacy</a>
          <a href="/contact" className="text-sm text-red-600 hover:underline">Contact</a>
        </div>
      </footer>
    </div>
  );
}
