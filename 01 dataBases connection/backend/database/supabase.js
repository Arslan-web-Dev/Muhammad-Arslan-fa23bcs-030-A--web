const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

let supabase;

const connect = async () => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('YOUR_SUPABASE_URL_HERE')) {
        throw new Error('Supabase credentials not fully configured in backend/.env');
    }

    try {
        if (!supabase) {
            supabase = createClient(supabaseUrl, supabaseKey);
            console.log('Successfully connected to Supabase client.');
        }
        return supabase;
    } catch (err) {
        console.error('Error initializing Supabase client:', err.message);
        throw err;
    }
};

const getAll = async () => {
    if (!supabase) await connect();
    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) throw error;
    return data;
};

const create = async (data) => {
    if (!supabase) await connect();
    const { data: inserted, error } = await supabase
        .from('products')
        .insert([data])
        .select();

    if (error) throw error;
    return inserted[0];
};

const update = async (id, data) => {
    if (!supabase) await connect();
    // Assuming 'id' is the primary key in Supabase table
    const { data: updated, error } = await supabase
        .from('products')
        .update(data)
        .eq('id', id)
        .select();

    if (error) throw error;
    return updated[0];
};

const remove = async (id) => {
    if (!supabase) await connect();
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) throw error;
    return { id };
};

module.exports = { connect, getAll, create, update, remove };
