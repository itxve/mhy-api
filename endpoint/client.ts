import NetFetch from "@/request";
import config from "@/config";

const Net = new NetFetch(config.ApiServer);

function rewards() {
  return Net.getFetch(`/rewards`);
}

function userGameInfo(cookie: string) {
  return Net.postFetch(`/gameInfo`, {
    body: JSON.stringify({ cookie }),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
/**
 * 获取签到记录
 * @returns
 */
function signRecord({ cookie, region, game_uid }: MH.D.AwardsRecordRequest) {
  return Net.postFetch(`/sign-record`, {
    body: JSON.stringify({ cookie, region, game_uid }),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function sign({ cookie, region, game_uid }: MH.D.SignRequest) {
  return Net.postFetch(`/sign`, {
    body: JSON.stringify({ cookie, region, game_uid }),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

export { rewards, userGameInfo, signRecord, sign };
