import pdfParse from "pdf-parse";

export default class PDFService {
  file: Buffer;
  constructor(file: Buffer) {
    this.file = file;
  }

  async exec() {
    return await pdfParse(this.file)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
