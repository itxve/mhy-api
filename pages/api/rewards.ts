import { S } from "@/endpoint";
import { ACT_ID } from "@/constant";
import type { NextApiRequest, NextApiResponse } from "next";
import { runCorsMiddleware } from "@/middleware";

/**
 * 奖励列表接口
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runCorsMiddleware(req, res);
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
