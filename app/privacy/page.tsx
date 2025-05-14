export default function Privacy() {
  return (
    <div className="min-h-screen bg-white text-gray-900 p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="flex justify-between items-center py-4 border-b border-gray-200 mb-8">
        <h1 className="text-3xl font-bold text-red-600">Privacy Policy</h1>
        <a href="/" className="text-red-600 hover:underline">Back to Home</a>
      </header>
      
      <main className="max-w-4xl mx-auto">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p className="mb-4">This Privacy Policy explains how 24Hour AI collects, uses, and protects your personal information when you use our service.</p>
          <p>By using our service, you agree to the collection and use of information in accordance with this policy.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
          <p className="mb-4">We collect information that you provide directly to us, such as account information and payment details.</p>
          <p>We also automatically collect certain information about your device and how you interact with our service.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">We use your information to provide, maintain, and improve our services.</p>
          <p>This includes processing transactions, sending notifications, and preventing fraud.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Data Sharing and Disclosure</h2>
          <p className="mb-4">We do not sell your personal information to third parties.</p>
          <p>We may share information with service providers who help us operate our business.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
          <p className="mb-4">We implement appropriate security measures to protect your personal information.</p>
          <p>However, no method of transmission over the Internet is 100% secure.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
          <p className="mb-4">You may have rights to access, correct, or delete your personal information.</p>
          <p>Contact us if you wish to exercise these rights.</p>
        </section>
      </main>
      
      <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  );
}
