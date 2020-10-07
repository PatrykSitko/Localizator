import router from "./router.js";
import fetchIPQualityScore, {
  API_KEY,
} from "../functions/fetch/IPQualityScore.js";
import fetchGeojs from "../functions/fetch/geojs.js";
import ipv4db from "../database/init/ipv4.js";

router.put("/ipv4", async (req, res) => {
  const { ipv4 } = req.body;
  const registered = await ipv4db.getRowsAsync("IPConnections", { ipv4 });
  let register = true;
  if (registered.ipv4) {
    const lastRegistryDate = registered.date[registered.date.length - 1];
    const dateDifferenceInDays = parseInt(
      (Date.now() - lastRegistryDate) / (24 * 3600 * 1000)
    );
    if (dateDifferenceInDays < 7) {
      register = false;
    }
  }
  if (register) {
    const ipQualityScore = await fetchIPQualityScore(API_KEY, ipv4);
    const geojs = await fetchGeojs(ipv4);
    ipv4db
      .addRowAsync("IPConnections", {
        ipv4,
        date: Date.now(),
        data: { geojs, ipQualityScore },
      })
      .then(() => res.json({ saved: ipv4 }))
      .catch((err) => {
        console.error(err);
        res.json({ saved: null });
      });
  } else {
    res.json({ saved: ipv4 });
  }
});

export default router;
