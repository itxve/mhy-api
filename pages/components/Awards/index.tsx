import { useEffect, useState } from "react";
import { C } from "@/endpoint";
import AwardsList from "./AwardsList";
import Cookie from "@/pages/components/Cookie";
import AwardsStyles from "./Awards.module.css";
import UserList from "@/pages/components/UserList";
import { UsersContext } from "@/hooks";
import util from "@/util";
import Link from "@/pages/components/Link";

export default function Awards() {
  //奖励列表
  const [awards, setAwards] = useState({
    month: 0,
    awards: [],
  });
  //用户列表
  const [users, setUsers] = useState<MH.Context.UserContext["users"]>({});
  //存储当前账号的key
  const [currentUser, setUser] = useState<MH.D.UserInfo>({});
  //存储当前账号的签到信息
  const [userSignRecord, setUserSignRecord] = useState<MH.D.SignRecord>({});
  //刷新用户列表
  const refreshUser = () => {
    const alls = util.getLocalUsers();
    setUsers(alls);
    const firstUser: MH.D.UserInfo | undefined = Object.values(alls).find(
      (_, index) => index === 0
    );
    if (firstUser && Object.keys(currentUser).length <= 0) {
      setCurrentUser(firstUser.game_uid);
    } else {
      setCurrentUser(currentUser!.game_uid);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    fetchAwards();
  }, []);

  //奖励列表
  const fetchAwards = () => {
    C.rewards().then((res) => {
      setAwards(res);
    });
  };

  const setCurrentUser: MH.D.setCurrentUser = (game_uid) => {
    const user = util.getLocalUsers()[game_uid!] || {};
    if (user.cookie) {
      setUser(user);
      C.signRecord({
        cookie: user.cookie!,
        region: user.region!,
        game_uid: user.game_uid!,
      }).then((res) => {
        const account = util.getLocalUsers();
        account[`${user.game_uid}`].record = res;
        util.setLocalUsers(account);
        console.log(account[`${user.game_uid}`], "account[`${user.game_uid}`]");
        setUserSignRecord(res);
      });
    }
  };

  return (
    <UsersContext.Provider
      value={{
        refreshUser,
        users,
        currentUser,
        setCurrentUser,
        userSignRecord,
      }}
    >
      <div className={AwardsStyles["awards-container"]}>
        <div>
          <Link
            links={[
              {
                name: "内鬼爆料",
                url: "https://genshin.honeyhunterworld.com/?lang=CHS",
              },
              {
                name: "原魔计算器",
                url: "https://genshin.mingyulab.com",
              },
              {
                name: "原神WIKI_BWIKI_哔哩哔哩",
                url: "https://wiki.biligame.com/ys/%E8%A7%92%E8%89%B2",
              },
            ]}
          />
        </div>
        <div className={AwardsStyles["awards-list"]}>
          <Cookie />
          <AwardsList {...awards} />
        </div>
        <div>
          <UserList />
        </div>
      </div>
    </UsersContext.Provider>
  );
}
