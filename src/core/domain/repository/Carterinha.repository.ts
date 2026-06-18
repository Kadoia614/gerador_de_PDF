import { CreateCarterinhaRequestDTO, CreateCarterinhaResponseDTO} from "../../application/dto/CreateCarterinha.dto.js";

export default interface CarterinhaRepository {
    create(data: CreateCarterinhaRequestDTO): Promise<CreateCarterinhaResponseDTO>;
}