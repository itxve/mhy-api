import AwardsStyle from "./Awards.module.css";
import Loading from "@/pages/components/Loading";
import NewAwardsItem from "./AwardItem";
import { useMediaQuery } from "@react-hook/media-query";
import { useContext, useState } from "react";
import { OptionalComponent, MultipleClass } from "@/util";
import { MH } from "@/types";
import { UsersContext } from "@/hooks";

export default function AwardsList({ month, awards }: MH.C.AwardsListC) {
  const media767Px = useMediaQuery("screen and (max-width: 767px)");
  const { currentUser } = useContext(UsersContext);
  const [isOpen, setOpen] = useState(false);
  const items = () => {
    if (media767Px && !isOpen) {
      return awards?.filter((_, i) => i < 12);
    } else {
      return awards;
    }
  };

  return (
    <div
      className={MultipleClass([
        AwardsStyle["awards-card"],
        {
          [AwardsStyle["open-img"]]: media767Px && isOpen,
        },
        {
          [AwardsStyle["close-img"]]: media767Px && !isOpen,
        },
      ])}
    >
      <span className={AwardsStyle["month-text"]}>
        <b>{month}</b> <span>月签到奖励列表</span>
      </span>

      <span className={AwardsStyle["sign-day-text"]}>每日签到</span>
      <span className={AwardsStyle["sign-text"]}>
        {currentUser?.record?.is_sign ? "今日已签到" : "今日还未签到"}
      </span>
      <div className={MultipleClass([AwardsStyle["list-awards"]])}>
        <Loading loading={!awards?.length} width={40} height={40}>
          {items()?.map((it, index) => {
            return <NewAwardsItem key={"it" + index} {...{ ...it, index }} />;
          })}
        </Loading>
        {media767Px && (
          <>
            {OptionalComponent.of(!isOpen, () => (
              <span
                className={MultipleClass([
                  AwardsStyle["load-text"],
                  AwardsStyle["open"],
                ])}
                onClick={() => {
                  setOpen(!isOpen);
                }}
              >
                加载更多
              </span>
            ))}
            {OptionalComponent.of(isOpen, () => (
              <span
                className={MultipleClass([
                  AwardsStyle["load-text"],
                  AwardsStyle["close"],
                ])}
                onClick={() => {
                  setOpen(!isOpen);
                }}
              >
                收起
              </span>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
