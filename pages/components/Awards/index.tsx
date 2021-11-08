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
  const [users, setUserList] = useState<MH.Context.UserContext["users"]>({});
  //存储当前账号的key
  const [currentUser, setUser] = useState<MH.D.UserInfo>({});
  //刷新用户列表
  const refreshUser = () => {
    const alls = util.getLocalUsers();
    setUserList(alls);
  };

  //设置当前用户
  const setCurrentUser: MH.D.setCurrentUser = (game_uid) => {
    const user = util.getLocalUsers()[game_uid!];
    console.log(user, "user...");
    if (user?.cookie) {
      C.signRecord({
        cookie: user.cookie!,
        region: user.region!,
        game_uid: user.game_uid!,
      })
        .then((res) => {
          const account = util.getLocalUsers();
          account[`${user.game_uid}`].record = res;
          account[`${user.game_uid}`].expire = false;
          util.setLocalUsers(account);
          setUser(account[`${user.game_uid}`]);
          refreshUser();
        })
        .catch((e) => {
          util.expireUser(game_uid!);
          user.record = {};
          setUser(user);
        });
    }
  };

  //跟新本地用户信息
  const refreshRemoteUserInfo = () => {
    console.log("refresh remote...");
    const alls = util.getLocalUsers();
    Promise.all<void>(
      Object.values(alls)
        .filter((it) => it.cookie)
        .map((it) => {
          return new Promise((resolve, reject) => {
            C.userGameInfo(it.cookie!)
              .then((r) => {
                const { list } = r;
                list.map((user: MH.D.UserInfo) => {
                  //更新本地的用户信息
                  alls[user.game_uid!] = Object.assign(
                    alls[user.game_uid!],
                    user
                  );
                  resolve();
                });
              })
              .catch((e) => {
                //标识凭证过期
                console.log(it.game_uid + "::expired", e);
                alls[it.game_uid!].record = {};
                alls[it.game_uid!].expire = true;
                resolve();
              });
          });
        })
    ).then(() => {
      util.setLocalUsers(alls);
      refreshUser();
    });
  };

  useEffect(() => {
    refreshRemoteUserInfo();
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

  return (
    <UsersContext.Provider
      value={{
        refreshUser,
        users,
        currentUser,
        setCurrentUser,
      }}
    >
      <div className={AwardsStyles["awards-container"]}>
        <div>
          <UserList />
        </div>
        <div className={AwardsStyles["awards-list"]}>
          <Cookie />
          <AwardsList {...awards} />
        </div>
      </div>
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
    </UsersContext.Provider>
  );
}
