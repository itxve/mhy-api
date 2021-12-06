import { useState, useContext } from "react";
import CookieStyles from "./Cookie.module.css";
import Button from "@/pages/components/Button";
import { C } from "@/endpoint";
import { UsersContext } from "@/hooks";
import util from "@/util";
import { MH } from "@/types";
export default function Cookie() {
  return <CookieTextAreaVolidata />;
}

const CookieTextAreaVolidata = () => {
  const { refreshUser, setCurrentUser } = useContext(UsersContext);
  const [textValue, setTextValue] = useState("");
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
    if (!textValue) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      C.userGameInfo(textValue)
        .then(({ list }) => {
          list.map((user: MH.D.UserInfo) => {
            saveToLocal(user);
          });
          resolve(true);
        })
        .catch((e) => reject(e))
        .finally(() => {
          setTextValue("");
        });
    });
  };

  return (
    <div className={CookieStyles.areaMain}>
      <textarea
        placeholder="请输入Cookie凭证"
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
