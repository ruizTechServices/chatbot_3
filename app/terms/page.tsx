export default function Terms() {
  return (
    <div className="min-h-screen bg-white text-gray-900 p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="flex justify-between items-center py-4 border-b border-gray-200 mb-8">
        <h1 className="text-3xl font-bold text-red-600">Terms of Service</h1>
        <a href="/" className="text-red-600 hover:underline">Back to Home</a>
      </header>
      
      <main className="max-w-4xl mx-auto">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p className="mb-4">Welcome to 24Hour AI. By using our service, you agree to these Terms of Service in their entirety.</p>
          <p>These terms govern your use of our platform and form a binding agreement between you and 24Hour AI.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Service Description</h2>
          <p className="mb-4">24Hour AI provides access to AI language models for a period of 24 hours after payment.</p>
          <p>We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
          <p className="mb-4">Users are responsible for all content generated through our service and must comply with applicable laws.</p>
          <p>Prohibited uses include generating illegal, harmful, or abusive content.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Payment and Refunds</h2>
          <p className="mb-4">Access is provided for $1 per 24-hour period. All payments are final and non-refundable.</p>
          <p>We reserve the right to change our pricing at any time.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Privacy</h2>
          <p className="mb-4">Your use of our service is also governed by our Privacy Policy.</p>
          <p>We collect and process data as described in our Privacy Policy.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. Disclaimer of Warranties</h2>
          <p>The service is provided "as is" without warranties of any kind, either express or implied.</p>
        </section>
      </main>
      
      <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  );
}
