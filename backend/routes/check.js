import router from "./router.js";
import ipv4DB from "../database/init/ipv4.js";

class IPv4NotFoundError extends Error {}

router.post("/ipv4/proxy-in-use", (req, res) => {
  const { ipv4 } = req.body;
  ipv4DB
    .getRowsAsync("IPConnections", { ipv4 })
    .then((results) => {
      if (Object.keys(results).length === 0) {
        throw new IPv4NotFoundError();
      } else {
        res.json({
          proxyInUse:
            results.data[results.data.length - 1].ipQualityScore.proxy,
          err: null,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.json({
        proxyInUse: null,
        err: err.constructor.name,
      });
    });
});

router.post("/ipv4/tor-in-use", (req, res) => {
  const { ipv4 } = req.body;
  ipv4DB
    .getRowsAsync("IPConnections", { ipv4 })
    .then((results) => {
      if (Object.keys(results).length === 0) {
        throw new IPv4NotFoundError();
      } else {
        res.json({
          torInUse: results.data[results.data.length - 1].ipQualityScore.tor,
          err: null,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.json({
        torInUse: null,
        err: err.constructor.name,
      });
    });
});

router.post("/ipv4/vpn-in-use", (req, res) => {
  const { ipv4 } = req.body;
  console.log(ipv4);
  ipv4DB
    .getRowsAsync("IPConnections", { ipv4 })
    .then((results) => {
      if (Object.keys(results).length === 0) {
        throw new IPv4NotFoundError();
      } else {
        res.json({
          vpnInUse: results.data[results.data.length - 1].ipQualityScore.vpn,
          err: null,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.json({
        vpnInUse: null,
        err: err.constructor.name,
      });
    });
});

export default router;
