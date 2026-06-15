export default interface PDFServiceRepository {
    
  createPDF(
    dirPath: string,
    name: string,
    image?: { path: string; width: number },
    text?: { data: string; x: number; y: number }[],
  ): Promise<{ fullPath: string; size: number }> 

  readPDFAsBuffer(filePath: string): Promise<Buffer>

  PDFToBuffer(path: string): Promise<Buffer> 
}