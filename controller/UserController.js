import { queryDatabase } from "../helper/Helper.js";

export const add_data = async (req, res) => {
    const { first_name, last_name, e_mail, country_id, state_id, city_id, gender, dob, age } = req.body;

    // Check if all required fields are present
    if (!first_name || !last_name || !e_mail || !country_id || !state_id || !city_id || !gender || !dob || !age) {
        return res.status(400).json({ msg: 'All fields are required!', status: false });
    }

    try {
        // Example query and parameters
        const query = `INSERT INTO users (first_name, last_name, e_mail, country_id, state_id, city_id, gender, dob, age) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [first_name, last_name, e_mail, country_id, state_id, city_id, gender, dob, age];

        // Execute query within transaction
        await queryDatabase(query, params);
        // Send success response
        res.status(200).json({ msg: "Data inserted successfully!", status: true });
    } catch (error) {
        // Send error response
        res.status(500).json({ msg: error.message, status: false });
    }
};

export const get_data = async (req, res) => {
    try {
        const query = `SELECT u.id, u.first_name,u.last_name, u.e_mail, u.gender,u.dob,u.age,c.name AS country,s.name AS state, ct.name AS city
        FROM users AS u
        LEFT JOIN tbl_countries AS c ON c.id = u.country_id
        LEFT JOIN tbl_states AS s ON s.id = u.state_id
        LEFT JOIN tbl_cities AS ct ON ct.id = u.city_id`;
        const params = [];
        const data = await queryDatabase(query, params);
        // Send success response
        res.status(200).json({ msg: "Data inserted successfully!", status: true, data });
    } catch (error) {
        res.status(500).json({ msg: error.message, status: false });
    }
}

export const get_country = async (req, res) => {
    try {
        const query = `SELECT id, name FROM tbl_countries`;
        const params = [];
        const data = await queryDatabase(query, params);
        // Send success response
        return res.status(200).json({ msg: "Get Country successfully!", status: true, data });
    } catch (error) {
        console.error('Error in get_country:', error);
        res.status(500).json({ msg: error.message, status: false });
    }
}

export const get_state = async (req, res) => {
    const state_id = req.query.id;
    try {
        const query = `SELECT id, name FROM tbl_states WHERE country_id = ?`;
        const params = [state_id];
        const data = await queryDatabase(query, params);
        // Send success response
        res.status(200).json({ msg: "Get State successfully!", status: true, data });
    } catch (error) {
        res.status(500).json({ msg: error.message, status: false });
    }
}

export const get_city = async (req, res) => {
    const city_id = req.query.id;
    try {
        const query = `SELECT id, name FROM tbl_cities WHERE state_id = ?`;
        const params = [city_id];
        const data = await queryDatabase(query, params);
        // Send success response
        res.status(200).json({ msg: "Get City successfully!", status: true, data });
    } catch (error) {
        res.status(500).json({ msg: error.message, status: false });
    }
}
