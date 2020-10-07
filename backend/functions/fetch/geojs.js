import fetch from "node-fetch";

/**
 * @returns {JSON | Promise<JSON>}
 * KEYS: 
    "organization_name",
    "region",
    "accuracy",
    "asn",
    "organization",
    "timezone",
    "longitude",
    "country_code",
    "area_code",
    "ip",
    "city",
    "country",
    "continent_code",
    "country_code",
    "latitude" 
 */
export default async (ipv4) =>
  await (await fetch(`https://get.geojs.io/v1/ip/geo/${ipv4}.json`)).json();
