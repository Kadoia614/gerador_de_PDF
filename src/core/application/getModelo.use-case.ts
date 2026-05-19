import { readFileSync,  } from "fs";

export default class GetUseCase {
    async execute() {
        const data = readFileSync("public/modelos/esporte/modeloEsporte.png")

        return data
    }
}