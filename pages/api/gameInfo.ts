import { S } from "../endpoint";
import type { NextApiRequest, NextApiResponse } from "next";
/**
 * 用户信息接口接口
 * @param req
 * @param res
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cookie } = req.body;
  S.userGameInfo(cookie)
    .then((rt) => {
      const { message, data } = rt;
      if (message === "OK") {
        res.status(200).send(data);
      } else {
        res.status(400).send({ message });
      }
    })
    .catch((e) => {
      res.status(500).send(e);
    });
}
