const { client: supabase } = require('../config/supabase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'Please provide email and password' });

    try {
        // Check if user already exists
        const { data: existingUser, error: checkError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into Supabase users table
        const { data: newUser, error } = await supabase
            .from('users')
            .insert([{ email, password: hashedPassword }])
            .select();

        if (error) {
            console.error('Supabase insert error:', error);
            return res.status(500).json({ msg: 'Error creating user' });
        }

        // Generate JWT
        const payload = { user: { id: newUser[0].id, email: newUser[0].email } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
            res.json({ token, msg: 'Registration successful', user: { id: newUser[0].id, email: newUser[0].email } });
        });
    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(500).json({ msg: 'Server error during registration' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'Please provide email and password' });

    try {
        // Get user from Supabase
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        // Generate JWT
        const payload = { user: { id: user.id, email: user.email } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
            res.json({ token, msg: 'Login successful', user: { id: user.id, email: user.email } });
        });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ msg: 'Server error during login' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ msg: 'Logged out successfully' });
};

exports.getMe = async (req, res) => {
    try {
        // User is already verified in middleware
        const user = req.user;
        res.json(user);
    } catch (err) {
        console.error('Get user error:', err.message);
        res.status(500).json({ msg: 'Server error retrieving user data' });
    }
};

// Get all registered users (admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const { data: users, error } = await supabase
            .from('users')
            .select('id, email, created_at')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json(users);
    } catch (err) {
        console.error('Get all users error:', err.message);
        res.status(500).json({ msg: 'Error fetching users' });
    }
};
