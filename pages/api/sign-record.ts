import { S } from "../endpoint";
import type { NextApiRequest, NextApiResponse } from "next";
/**
 * 奖励记录信息接口
 * @param req
 * @param res
 */

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cookie, region, game_uid }: MH.D.AwardsRecordRequest = req.body;
  S.signRecord({ cookie, region, game_uid })
    .then((rt) => {
      const { message, data } = rt;
      if (message === "OK") {
        res.status(200).send(data);
      } else {
        res.status(400).send(rt);
      }
    })
    .catch((e) => {
      res.status(500).send(e);
    });
}
