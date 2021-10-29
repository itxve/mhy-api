import { S } from "../../endpoint";
import type { NextApiRequest, NextApiResponse } from "next";
/**
 * 签到接口
 * @param req
 * @param res
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cookie, region, game_uid }: MH.D.SignRequest = req.body;
  S.sign({ cookie, region, game_uid })
    .then((rt) => {
      const { message, data } = rt;
      if (message === "OK") {
        res.status(200).send(data);
      } else {
        res.status(400).send(rt);
      }
    })
    .catch((e) => {
      res.status(500).send({ e });
    });
}
