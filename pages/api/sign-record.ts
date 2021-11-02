import { S } from "../../endpoint";
import type { NextApiRequest, NextApiResponse } from "next";
import { runCorsMiddleware } from "@/middleware";
/**
 * 奖励记录信息接口
 * @param req
 * @param res
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runCorsMiddleware(req, res); 
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
