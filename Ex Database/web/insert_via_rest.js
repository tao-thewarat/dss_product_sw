const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://aihaslnyujfdidmspisi.supabase.co';
const supabaseKey = 'sb_publishable_kLdMke5cj-DjPw8vdGqiCA_13vUl5QB';
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const newCustomers = [
    { customer_id: 1001, name: 'Somchai Jaidee', email: 'somchai@example.com', password_hash: 'hash12345' },
    { customer_id: 1002, name: 'Suda Srisuk', email: 'suda@example.com', password_hash: 'hash12345' },
    { customer_id: 1003, name: 'Mana Rakthai', email: 'mana@example.com', password_hash: 'hash12345' },
    { customer_id: 1004, name: 'Manee Dee', email: 'manee@example.com', password_hash: 'hash12345' },
    { customer_id: 1005, name: 'Piti Piti', email: 'piti@example.com', password_hash: 'hash12345' },
    { customer_id: 1006, name: 'Chujai Jai', email: 'chujai@example.com', password_hash: 'hash12345' },
    { customer_id: 1007, name: 'Weera Weera', email: 'weera@example.com', password_hash: 'hash12345' },
    { customer_id: 1008, name: 'Naree Naree', email: 'naree@example.com', password_hash: 'hash12345' },
    { customer_id: 1009, name: 'Panya Panya', email: 'panya@example.com', password_hash: 'hash12345' },
    { customer_id: 1010, name: 'Somsri Somsri', email: 'somsri@example.com', password_hash: 'hash12345' }
  ];

  console.log("Attempting to insert via HTTPS (Port 443)...");
  
  const { data, error } = await supabase
    .from('customers')
    .insert(newCustomers)
    .select();

  if (error) {
    console.error("Error inserting:", error);
    process.exit(1);
  }
  
  console.log("✅ Success! Inserted data rows:", data.length);
}

main();
