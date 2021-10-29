import { useState, useContext } from "react";
import CookieStyles from "./Cookie.module.css";
import Button from "@/pages/components/Button";
import { C } from "@/pages/endpoint";
import { UsersContext } from "@/pages/hooks";
import util from "@/pages/util";
export default function Cookie() {
  return (
    <div>
      <CookieTextAreaVolidata />
    </div>
  );
}

const CookieTextAreaVolidata = () => {
  const { refreshUser, setCurrentUser } = useContext(UsersContext);
  const [textValue, setTextValue] = useState(
    "UM_distinctid=17b86a79cb51c6-072536cf470622-35637203-1aeaa0-17b86a79cb6b52; _MHYUUID=fa862f64-ffbe-4045-9524-8e4a94490698; mi18nLang=zh-cn; cookie_token=2tqBaaqelayVOqlF0vev5QURWAhiJRvM8E2B2KoR; account_id=286456855; _ga_831VBKXN1V=GS1.1.1632900977.1.1.1632901075.0; aliyungf_tc=456f1ee7a18b261b32a1d72179e79c58fb6ee1202df39d6ec798543926a809d0; _ga_YQPW66MJ73=GS1.1.1634266926.3.1.1634266936.0; login_uid=286456855; login_ticket=pzYx8qvSq7N17L0KwA6wX4xAo4tNn6AyPU2DUtGR; ltoken=xaoaIFTbD7BbDCftcIRRwVmzJnvtem5BgOBs8Bm5; ltuid=286456855; _gid=GA1.2.1808128809.1634801811; _ga_KJ6J9V9VZQ=GS1.1.1634804331.3.0.1634804335.0; _ga=GA1.2.1357503034.1630051738"
  );
  const saveToLocal = (user: MH.D.UserInfo) => {
    const account = util.getLocalUsers();
    const current = { ...user, cookie: textValue };
    account[`${user.game_uid}`] = current;
    util.setLocalUsers(account);
    refreshUser?.();
    setCurrentUser?.(user.game_uid);
  };

  //Cookie有效性校验
  const volidateCookie = () => {
    return new Promise((resolve, reject) => {
      C.userGameInfo(textValue)
        .then(({ list }) => {
          list.map((user: MH.D.UserInfo) => {
            saveToLocal(user);
          });
          resolve(true);
        })
        .catch((e) => reject(e));
    });
  };

  return (
    <div className={CookieStyles.areaMain}>
      <textarea
        value={textValue}
        className={CookieStyles.text}
        onChange={(e) => {
          setTextValue(e.target.value);
        }}
        rows={5}
      />
      <span className={CookieStyles.areaButton}>
        <Button onClick={volidateCookie}>校验</Button>
      </span>
    </div>
  );
};
