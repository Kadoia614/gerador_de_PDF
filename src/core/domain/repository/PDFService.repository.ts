export default interface PDFServiceRepository {
    
  createPDF(
    dirPath: string,
    name: string,
    image?: { path: string; width: number },
    text?: { data: string | number; x: number; y: number, fontSize?: number, color?: string }[],
  ): Promise<{ fullPath: string; size: number }> 

  readPDFAsBuffer(filePath: string): Promise<Buffer>

  PDFToBuffer(path: string): Promise<Buffer> 
}