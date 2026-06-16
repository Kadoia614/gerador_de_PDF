import PDF from "../entity/PDF.js";

export default interface PDFRepository {

  savePDF(name: string, path: string): Promise<PDF>;

  getPDFByUuid(id: string): Promise<PDF | null> 

  deletePDF(id: string): Promise<boolean>;

  listAllPDFs(): Promise<PDF[]>
}