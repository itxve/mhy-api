import AwardsStyle from "./Awards.module.css";
import Loading from "@/pages/components/Loading";
import NewAwardsItem from "./AwardItem";
export default function AwardsList({ month, awards }: MH.C.AwardsListC) {
  return (
    <div className={AwardsStyle["awards-card"]}>
      <span className={AwardsStyle["month-text"]}>
        <b>{month}</b> <span>月签到奖励列表</span>
      </span>
      <div className={AwardsStyle["list-awards"]}>
        <Loading loading={!awards?.length} width={40} height={40}>
          {awards?.map((it, index) => {
            return <NewAwardsItem key={"it" + index} {...{ ...it, index }} />;
          })}
        </Loading>
      </div>
    </div>
  );
}
