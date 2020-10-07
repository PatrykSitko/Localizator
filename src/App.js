import React, { useState } from "react";
import useFetchUserIPv4 from "./effects/use/fetch/userIPv4";
import useSaveUserIPv4 from "./effects/use/save/userIPv4";
import useCheckIPv4UsesProxy from "./effects/use/check/ipv4/usesProxy";
import useCheckIPv4UsesTor from "./effects/use/check/ipv4/usesTor";
import useCheckIPv4UsesVPN from "./effects/use/check/ipv4/usesVPN";
import Loading from "./components/loading.js";
import Notice from "./components/notice/index.js";
import Router from "./router/routes.js";

function App() {
  const [state, setStateDefault] = useState({});
  const setState = ({ ...props }) => setStateDefault({ ...state, ...props });
  const userIPv4 = useFetchUserIPv4();
  const userIPv4Saved = useSaveUserIPv4(userIPv4);
  const uses = {
    proxy: useCheckIPv4UsesProxy(userIPv4, userIPv4Saved),
    tor: useCheckIPv4UsesTor(userIPv4, userIPv4Saved),
    vpn: useCheckIPv4UsesVPN(userIPv4, userIPv4Saved),
  };
  return (
    <div className="App">
      <Loading {...{ userIPv4Saved }} />
      <Notice.QuitTor usesTor={uses.tor} />
      <Notice.TurnOffVPN usesVPN={!uses.tor && uses.vpn} />
      <Notice.TurnOffProxy usesProxy={!uses.tor && !uses.vpn && uses.proxy} />
      {
        <Router
          allowedToRoute={
            uses.proxy !== null &&
            !uses.proxy &&
            uses.tor !== null &&
            !uses.tor &&
            uses.vpn !== null &&
            !uses.vpn
          }
          {...{ ...state, setState }}
        />
      }
    </div>
  );
}

export default App;
