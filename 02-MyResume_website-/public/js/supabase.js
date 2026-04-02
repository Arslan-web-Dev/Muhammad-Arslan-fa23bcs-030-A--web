// public/js/supabase.js
// Initialize Supabase client
const supabaseUrl = 'https://iqkgdueatwdlncwmpspd.supabase.co';
const supabaseKey = 'sb_publishable_s8xJKHdF52ZdNt0Cs_9FCQ_G2e6iAG3';

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Make it available globally
window.supabaseClient = supabase;