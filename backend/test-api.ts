import { db } from './src/db';
import { leads } from './src/db/schema';
import { eq } from 'drizzle-orm';

async function testAPI() {
  console.log('Testing API operations...');
  
  try {
    // Test 1: List all leads
    console.log('\n1. Fetching all leads...');
    const allLeads = await db.select().from(leads);
    console.log(`   Found ${allLeads.length} leads`);
    
    // Test 2: Check for existing lead
    const testEmail = 'apitest@example.com';
    console.log(`\n2. Checking if ${testEmail} exists...`);
    const existingLeads = await db.select().from(leads).where(eq(leads.email, testEmail));
    console.log(`   Existing leads found: ${existingLeads.length}`);
    
    // Test 3: Insert a new lead
    console.log('\n3. Inserting new lead...');
    const [newLead] = await db.insert(leads).values({
      email: `test-${Date.now()}@example.com`,
      name: 'API Test User',
      company: 'Test Corp',
      phone: null,
      source: 'landing_page',
      status: 'new'
    }).returning();
    console.log('   New lead created:', newLead);
    
    console.log('\n✅ All API tests passed!');
  } catch (error) {
    console.error('\n❌ Error during API test:', error);
    if (error instanceof Error) {
      console.error('   Stack:', error.stack);
    }
  }
}

testAPI();

