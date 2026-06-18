import { entityDataEsporteDTO} from "../../application/dto/CreateCarterinhaEsporte.dto.js";
import { SvgEsporteData } from "../entity/SvgEsporte.js";

export default interface SvgEsporteDataRepository {
    create(data: entityDataEsporteDTO, uuid_carterinha: string): Promise<SvgEsporteData>;
}