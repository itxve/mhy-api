import NetFetch from "../request";
import util from "@/pages/util";
import { ACT_ID } from "@/pages/constant";
const Net = new NetFetch("https://api-takumi.mihoyo.com");

function rewards(act_id: string) {
  return Net.getFetch(`/event/bbs_sign_reward/home?act_id=${act_id}`);
}

function userGameInfo(cookie: string) {
  const headers = util.getHeader(cookie);
  return Net.getFetch(`/binding/api/getUserGameRolesByCookie`, { headers });
}

function signRecord({ cookie, region, game_uid }: MH.D.AwardsRecordRequest) {
  const headers = util.getHeader(cookie);
  return Net.getFetch(
    `/event/bbs_sign_reward/info?region=${region}&act_id=${ACT_ID}&uid=${game_uid}
  `,
    { headers }
  );
}

function sign({ cookie, region, game_uid }: MH.D.SignRequest) {
  const headers = util.getHeader(cookie);
  return Net.postFetch(`/event/bbs_sign_reward/sign`, {
    headers,
    body: JSON.stringify({ act_id: ACT_ID, region, uid: game_uid }),
  });
}

export { rewards, userGameInfo, signRecord, sign };
