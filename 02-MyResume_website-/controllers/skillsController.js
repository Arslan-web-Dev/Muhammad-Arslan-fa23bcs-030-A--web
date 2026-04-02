const { client: supabase } = require('../config/supabase');

exports.getSkills = async (req, res) => {
    try {
        const { data: skills, error } = await supabase
            .from('skills')
            .select('*');
        if (error) throw error;
        res.json(skills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error fetching skills' });
    }
};

exports.addSkill = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('skills')
            .insert([req.body])
            .select();
        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error adding skill' });
    }
};

exports.updateSkill = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('skills')
            .update(req.body)
            .eq('id', req.params.id)
            .select();
        if (error) throw error;
        if (!data || !data.length) return res.status(404).json({ msg: 'Skill not found' });
        res.json(data[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error updating skill' });
    }
};

exports.deleteSkill = async (req, res) => {
    try {
        const { error } = await supabase
            .from('skills')
            .delete()
            .eq('id', req.params.id);
        if (error) throw error;
        res.json({ msg: 'Skill removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error deleting skill' });
    }
};
