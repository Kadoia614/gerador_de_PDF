-- CreateTable
CREATE TABLE "carterinha_esporte" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "identidade" TEXT,
    "modalidade" TEXT,
    "cadastro" TEXT,
    "nascimento" TEXT,
    "endereco" TEXT,
    "numero" TEXT,
    "bairro" TEXT,
    "cep" TEXT,
    "obs" TEXT,
    "exame" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "carterinha_esporte_pkey" PRIMARY KEY ("id")
);
