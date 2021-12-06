import AwardItemStyle from "./AwardItem.module.css";
import { useContext } from "react";
import { UsersContext } from "@/hooks";
import { MultipleClass } from "@/util";
import { C } from "@/endpoint";
import { AudioContext } from "@/hooks";
import { MH } from "@/types";
//单个奖励
const AwardsItem = ({
  name,
  cnt,
  icon,
  index,
}: MH.D.Award & { index: number }) => {
  const { currentUser, setCurrentUser } = useContext(UsersContext);
  const { audio } = useContext(AudioContext);
  //已经签到
  let signed = false;
  //可签到的flag
  let canSign = false;
  //是否是今天
  let today = false;
  //可签到卡片标识
  if (currentUser?.record) {
    const { total_sign_day, is_sign } = currentUser.record;
    canSign = index === total_sign_day && !is_sign!;
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
      audio?.play();
    }
  };

  return (
    <div
      className={MultipleClass([
        AwardItemStyle["item-container"],
        {
          [AwardItemStyle["item-container-active"]]: canSign,
        },
        AwardItemStyle["item-container-normal"],
      ])}
      onClick={handelClick}
    >
      {signed && (
        <span className={MultipleClass([AwardItemStyle["item-received"]])}>
          <span className={AwardItemStyle["item-received-text"]}> 已领取</span>
        </span>
      )}
      {canSign && <span className={AwardItemStyle["item-receive-badge"]} />}

      <img
        className={MultipleClass([
          {
            [AwardItemStyle["signed"]]: signed,
          },
          AwardItemStyle["item-icon"],
        ])}
        src={icon}
      />

      <span className={AwardItemStyle["item-count"]}>x{cnt}</span>
      <span className={AwardItemStyle["item-day-text"]}>第{index + 1}天</span>
    </div>
  );
};

export default AwardsItem;
