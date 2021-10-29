import { S } from "../endpoint";
import { ACT_ID } from "@/pages/constant";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * 奖励列表接口
 * @param req
 * @param res
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  S.rewards(ACT_ID)
    .then(({ message, data }) => {
      if (message === "OK") {
        res.status(200).send(data);
      } else {
        res.status(400).send(data);
      }
    })
    .catch((e) => {
      res.status(500).send(e);
    });
}
