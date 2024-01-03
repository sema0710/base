import { IncomingForm } from "formidable";

import { NextApiRequest, NextApiResponse } from "next";
import PDFService from "../../../service/PDFService";

const UploadResumeWithFile = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  console.log("hihih");
  const { fileData } = await new Promise<any>((resolve, reject) => {
    const form = new IncomingForm({
      keepExtensions: true,
    });

    form.parse(request, (error, fields, files) => {
      if (error) return reject(error);
      console.log(files);
      return resolve({
        fileData: files,
        fields: fields,
      });
    });
  });

  const file = fileData.file;

  const arrayBuffer = await file.arrayBuffer();

  console.log(arrayBuffer);

  const pdfService = new PDFService(Buffer.from(arrayBuffer));
  pdfService.exec();

  response.status(200).json({});
};

export default UploadResumeWithFile;
