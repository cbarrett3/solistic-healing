import { createTestPost, createTestExternalPost } from '../app/admin/test-post-creation';

async function runTests() {
  console.log('=== Testing Blog Post Creation System ===');
  
  // Test original post creation
  console.log('\n1. Testing original post creation...');
  const originalSuccess = await createTestPost();
  console.log(`Original post creation ${originalSuccess ? 'succeeded' : 'failed'}`);
  
  // Test external post creation
  console.log('\n2. Testing external post creation...');
  const externalSuccess = await createTestExternalPost();
  console.log(`External post creation ${externalSuccess ? 'succeeded' : 'failed'}`);
  
  console.log('\n=== Test Results ===');
  console.log(`Original post: ${originalSuccess ? '✓' : '✗'}`);
  console.log(`External post: ${externalSuccess ? '✓' : '✗'}`);
  
  if (originalSuccess && externalSuccess) {
    console.log('\n✅ All tests passed!');
  } else {
    console.log('\n❌ Some tests failed. Check the logs for details.');
  }
}

runTests().catch(error => {
  console.error('Test execution failed:', error);
  process.exit(1);
});
