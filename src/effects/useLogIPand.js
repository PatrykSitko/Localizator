import { useEffect, useState } from "react";

export default (extrasJSON = {}) => {
  const [location, setLocation] = useState(undefined);
  const [whois, setWhois] = useState(undefined);
  const [coordinates, setCoordinates] = useState(undefined);
  const [proxy, setUsesProxy] = useState(undefined);
  const [vpn, setUsesVPN] = useState(undefined);
  const [tor, setUsesTor] = useState(undefined);
  useEffect(() => {
    if (!navigator.geolocation) {
      setCoordinates(false);
    } else if (coordinates === undefined) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) =>
          setCoordinates({ latitude, longitude }),
        () => setCoordinates(false)
      );
    }
  }, [coordinates, setCoordinates]);
  useEffect(() => {
    if (location && whois && coordinates !== undefined) {
      fetch("/logger/connections", {
        method: "PUT",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client: {
            ip: location.ip,
            coordinates: {
              longitude: coordinates ? coordinates.longitude : null,
              latitude: coordinates ? coordinates.latitude : null,
            },
          },
          whois,
          ...extrasJSON,
        }),
      })
        .then((res) => res.json())
        .then(({ proxy, vpn, tor }) => {
          setUsesProxy(proxy);
          setUsesVPN(vpn);
          setUsesTor(tor);
        })
        .catch(console.error);
    }
  }, [
    location,
    whois,
    coordinates,
    extrasJSON,
    setUsesProxy,
    setUsesVPN,
    setUsesTor,
  ]);
  useEffect(() => {
    if (location && !whois) {
      fetch(`https://get.geojs.io/v1/ip/geo/${location.ip}.json`)
        .then((res) => res.json())
        .then((geo) => setWhois(geo))
        .catch(console.error);
    }
  }, [location, whois, setWhois]);
  useEffect(() => {
    if (!location) {
      fetch("https://api.ipify.org/?format=json")
        .then((res) => res.json())
        .then(({ ip }) => setLocation({ ip }))
        .catch(console.error);
    }
  }, [location, setLocation]);
  return { uses: { proxy, vpn, tor }, ip: location && location.ip };
};
