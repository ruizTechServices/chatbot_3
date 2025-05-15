import { LLM_PROVIDERS, validateProviderAndModel, getAvailableProviders } from './llmProviders';

/**
 * This is a basic unit test file for the LLM provider system.
 * In a real-world scenario, you would use Jest, Vitest, or another testing framework.
 * You would also mock the API calls to avoid actual API usage during tests.
 */

// Test provider validation
function testValidateProviderAndModel() {
  console.log('Testing provider validation...');
  
  // Valid provider and model
  const valid1 = validateProviderAndModel('openai', 'gpt-3.5-turbo');
  console.assert(valid1 === true, 'Should validate existing provider and model');
  
  // Invalid provider
  const invalid1 = validateProviderAndModel('nonexistent', 'model');
  console.assert(invalid1 === false, 'Should reject non-existent provider');
  
  // Valid provider but invalid model
  const invalid2 = validateProviderAndModel('openai', 'nonexistent-model');
  console.assert(invalid2 === false, 'Should reject non-existent model');
  
  console.log('Provider validation tests completed');
}

// Test getAvailableProviders
function testGetAvailableProviders() {
  console.log('Testing getAvailableProviders...');
  
  const providers = getAvailableProviders();
  
  console.assert(Array.isArray(providers), 'Should return an array');
  console.assert(providers.length > 0, 'Should return at least one provider');
  
  const hasOpenAI = providers.some(p => p.providerId === 'openai');
  console.assert(hasOpenAI, 'Should include OpenAI provider');
  
  const firstProvider = providers[0];
  console.assert('providerId' in firstProvider, 'Provider should have providerId');
  console.assert('providerName' in firstProvider, 'Provider should have providerName');
  console.assert('models' in firstProvider, 'Provider should have models array');
  console.assert(Array.isArray(firstProvider.models), 'models should be an array');
  
  console.log('getAvailableProviders tests completed');
}

// Run tests
function runTests() {
  console.log('Starting LLM Provider tests...');
  testValidateProviderAndModel();
  testGetAvailableProviders();
  console.log('All tests completed');
}

// Export test runner for use in test scripts
export { runTests };

// Automatically run if called directly 
if (typeof require !== 'undefined' && require.main === module) {
  runTests();
}
