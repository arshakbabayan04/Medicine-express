const mysql = require("mysql2");

class DataBase {
    constructor() {
        this.db = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "medicine",
        });
    }

    myQuery(sql) {
        return new Promise((resolve, reject) => {
            this.db.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}
module.exports = new DataBase();
