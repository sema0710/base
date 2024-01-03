import { NextApiRequest, NextApiResponse } from "next";
import OpenAIService from "../../../service/OpenAIService";
import ProcessHTMLService from "../../../service/ProcessHTMLService";

const UploadResumeWithRallit = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { url } = await request.body;

  if (!url) {
    return {
      status: 400 as const,
      body: "Bad Request",
    };
  }

  if (typeof url !== "string") {
    return {
      status: 400 as const,
      body: "Bad Request",
    };
  }

  const res = await fetch(url);
  const text = await res.text();

  const htmlService = new ProcessHTMLService(text);
  const openaiService = new OpenAIService();
  htmlService.setTargetQuery("article");
  const processedHTML = htmlService.process();

  response.status(200).json({
    ...(await openaiService.exec(processedHTML)),
  });
};

export default UploadResumeWithRallit;
