import router from "./router.js";
import usersDB from "../database/init/users.js";

function isEmpty(rows) {
  return Object.keys(rows).length <= 0;
}
router.post("/authenticate", async (req, res) => {
  const { ipv4, login, password } = req.body;
  const registeredUser = await usersDB.getRowsAsync("Users", { login });
  if (isEmpty(registeredUser)) {
    res.json({
      status: usersDB.loginAttempt.statuses.UNKNOWN_USER,
      error: null,
    });
    return;
  }
  const authenticatedUser = await usersDB.getRowsAsync("Users", {
    login,
    password,
  });
  if (isEmpty(authenticatedUser)) {
    const addedRow = await usersDB.addRowAsync("LoginAttempts", {
      userID: login,
      date: Date.now(),
      ipv4,
      status: usersDB.loginAttempt.statuses.WRONG_PASSWORD,
    });
    if (isEmpty(addedRow)) {
      res.status = 500;
      res.json({
        status: usersDB.loginAttempt.statuses.SERVER_ERROR,
        error: "AuthenticationError",
      });
    } else {
      res.json({
        status: usersDB.loginAttempt.statuses.WRONG_PASSWORD,
        error: null,
      });
    }
    return;
  } else {
    const addedRow = await usersDB.addRowAsync("LoginAttempts", {
      userID: login,
      date: Date.now(),
      ipv4,
      status: usersDB.loginAttempt.statuses.ACCESS_GRANTED,
    });
    if (isEmpty(addedRow)) {
      res.status = 500;
      res.json({
        status: usersDB.loginAttempt.statuses.SERVER_ERROR,
        error: "AuthenticationError",
      });
      return;
    }
    const { AUTHENTICATION_TOKEN } = authenticatedUser;
    res.status = 202;
    res.json({
      status: usersDB.loginAttempt.statuses.ACCESS_GRANTED,
      AUTHENTICATION_TOKEN,
      error: null,
    });
  }
});

export default router;
