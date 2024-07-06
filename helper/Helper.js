import dbConnect from "../config/Config.js";

export async function queryDatabase(query, params) {
    return new Promise((resolve, reject) => {
        dbConnect.query(query, params, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
