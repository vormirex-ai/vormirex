import dotenv from 'dotenv';
import path from 'path';
import { validateEmail } from '../utils/zerobounce.js';

// Load environment variables from the correct path
dotenv.config({ path: path.resolve(process.cwd(), '../../env/backend/.env') });

const testZeroBounce = async () => {
  const apiKey = process.env.ZEROBOUNCE_API_KEY;
  console.log('Testing ZeroBounce Integration...');
  
  if (!apiKey) {
    console.error('❌ ZEROBOUNCE_API_KEY is missing in environment variables.');
    console.log('Please add it to /Users/ashishsingh/untitled folder/vormirex/env/backend/.env');
    return;
  }
  
  console.log(`✅ API Key found: ${apiKey.substring(0, 5)}...`);

  const testEmails = [
    { email: 'myuser@gmail.com', description: 'User Inquiry' },
  ];

  for (const test of testEmails) {
    console.log(`\nValidating: ${test.email} (${test.description})`);
    try {
      // Modify validateEmail briefly to log the response or doing it here would require changing the utility
      // Let's call the API directly here to see the raw response for debugging
      const url = `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${encodeURIComponent(test.email)}&ip_address=`;
      const response = await fetch(url);
      const data = await response.json();
      console.log('--- Raw ZeroBounce Response ---');
      console.log(JSON.stringify(data, null, 2));
      console.log('-------------------------------');

      const isValid = await validateEmail(test.email);
      console.log(`Utility Result: ${isValid ? '✅ Valid (Passed)' : '❌ Invalid (Failed)'}`);
    } catch (error: any) {
      console.log(`Utility Result: ❌ Error - ${error.message}`);
    }
  }
};

testZeroBounce();
