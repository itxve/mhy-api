import AwardsStyle from "./Awards.module.css";
import { useContext } from "react";
import { UsersContext } from "@/hooks";
import { MultipleClass } from "@/util";
import { C } from "@/endpoint";
export default function AwardsList({ month, awards }: MH.C.AwardsListC) {
  return (
    <>
      <div>{month}月签到奖励列表</div>
      <div className={AwardsStyle["list-awards"]}>
        {awards &&
          awards.map((it, index) => {
            return <AwardsItem key={"it" + index} {...{ ...it, index }} />;
          })}
      </div>
    </>
  );
}

//单个奖励
const AwardsItem = ({
  name,
  cnt,
  icon,
  index,
}: MH.D.Award & { index: number }) => {
  const { currentUser, userSignRecord, setCurrentUser } =
    useContext(UsersContext);
  //已经签到
  let signed = false;
  //可签到的flag
  let canSign = false;
  //今天
  let today = false;
  //可签到卡片标识
  if (userSignRecord) {
    const { total_sign_day, is_sign } = userSignRecord;
    canSign = index + 1 === total_sign_day && !is_sign!;
    signed = index + 1 <= total_sign_day!;
    today = index + 1 === total_sign_day;
  }

  const handelClick = () => {
    if (canSign && currentUser?.cookie) {
      const { cookie, region, game_uid } = currentUser!;
      C.sign({ cookie: cookie!, region: region!, game_uid: game_uid! }).then(
        (res) => {
          setCurrentUser?.(currentUser.game_uid);
        }
      );
    }
  };

  return (
    <div
      className={MultipleClass([
        AwardsStyle["list-main"],
        {
          [AwardsStyle["signed"]]: signed,
        },
        {
          [AwardsStyle["today-card"]]: today,
        },
      ])}
      onClick={handelClick}
    >
      {signed && <span className={AwardsStyle.received}>已领取</span>}
      {canSign && <span className={AwardsStyle.badge}>领</span>}
      <div>
        <img className={AwardsStyle.icon} src={icon} />
      </div>
      <div className={AwardsStyle.name}>x{cnt}</div>
      <div className={AwardsStyle.day}>第{index + 1}天</div>
    </div>
  );
};
