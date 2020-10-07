import fetch from "node-fetch";

export const API_KEY = "FwP4tAOAlE7xZOCVMcNh4VRdP8wHy2lb";

/**
 * @returns { JSON | Promise<JSON>}
 * KEYS:
    "success",
    "message",
    "fraud_score",
    "country_code",
    "region",
    "city",
    "ISP",
    "ASN",
    "organization",
    "latitude",
    "longitude",
    "is_crawler",
    "timezone",
    "mobile",
    "host",
    "proxy",
    "vpn",
    "tor",
    "active_vpn",
    "active_tor",
    "recent_abuse",
    "bot_status",
    "connection_type",
    "abuse_velocity",
    "request_id"
 */
export default async (apiKey, ipv4) =>
  await (
    await fetch(`https://ipqualityscore.com/api/json/ip/${apiKey}/${ipv4}`)
  ).json();
