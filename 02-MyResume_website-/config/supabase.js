const { createClient } = require('@supabase/supabase-js');

// initialize client using environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error(
        'Supabase credentials are not set. Please define SUPABASE_URL and SUPABASE_KEY (or SUPABASE_ANON_KEY) in your environment (e.g., .env file).'
    );
}

const supabase = createClient(supabaseUrl, supabaseKey);

// For admin operations, use service role key if available
const supabaseAdmin = supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : supabase;

module.exports = {
    client: supabase,
    admin: supabaseAdmin
};