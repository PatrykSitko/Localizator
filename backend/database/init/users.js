import JSONdb from "../../classes/JSONdb.js";
const db = new JSONdb("./database/users.json");
db.createTable("LoginAttempts", ["status", "userID", "date", "ipv4", "status"]);
db.loginAttempt = {
  statuses: {
    UNKNOWN_USER: "UNKNOWN_USER",
    WRONG_PASSWORD: "WRONG_PASSWORD",
    ACCESS_GRANTED: "ACCESS_GRANTED",
    ACCESS_DENIED: "ACCESS_DENIED",
    ACCESS_DENIED_UNTIL: "ACCESS_DENIED_UNTIL:{EPOCH}",
    SERVER_ERROR: "SERVER_ERROR",
  },
};
export default db;
