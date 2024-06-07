// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Content-Encoding", "none");
  res.flushHeaders();

  const senderId = req.query?.id;

  function sendEvent(message: string) {
    // the text has to start with `data:` and end with `\n\n`
    const text = `data: ${JSON.stringify({ senderId, message })}\n\n`;
    res.write(text, (err) => {
      if (err) console.log("sending failed", err);
    });
  }

  sendEvent("event streaming initiated");

  let i = 1;
  const id = setInterval(() => {
    sendEvent(`hello world ${i++}`);
  }, 1000);

  res.on("close", () => {
    clearInterval(id);
    res.end();
  });
}
