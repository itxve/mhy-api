import { useContext } from "react";
import { UsersContext } from "@/hooks";
import { MultipleClass } from "@/util";
import UserListStyle from "./UserList.module.css";

export default function UserList() {
  const { users } = useContext(UsersContext);
  return (
    <div className={UserListStyle["user-card"]}>
      <div className={UserListStyle["user-span"]}>账号列表:(点击切换)</div>
      <div className={UserListStyle["main"]}>
        {users &&
          Object.keys(users).map((key) => {
            const u = users[key];
            return <ListInfo key={u.game_uid} {...u} />;
          })}
      </div>
    </div>
  );
}

function ListInfo({
  game_uid,
  nickname,
  region_name,
  level,
  record,
  expire,
  avatar_url,
}: MH.D.UserInfo) {
  const { currentUser, setCurrentUser } = useContext(UsersContext);
  const isCurrent = currentUser!.game_uid === game_uid;
  const handelClick = () => {
    if (currentUser!.game_uid !== game_uid) {
      setCurrentUser?.(game_uid);
    }
  };
  return (
    <div
      onClick={handelClick}
      className={MultipleClass([
        UserListStyle["user-item"],
        { [UserListStyle["user-item-active"]]: isCurrent },
      ])}
    >
      <img className={UserListStyle["user-item-img"]} src={avatar_url} />
      <span>{nickname}</span>
      <span>{level}级</span>
      <span>{region_name}</span>
      <span>累积签到{record?.total_sign_day}天</span>
      {expire && (
        <span
          className={UserListStyle["user-expire"]}
          title="Cookie过期"
        ></span>
      )}
    </div>
  );
}
