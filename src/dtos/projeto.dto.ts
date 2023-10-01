export interface CreateProjetoDto {
    descricao: string;
    ferramenta: string;
    alunoId: string;
}

export interface DeleteProjetoDto {
    alunoId: string;
    id: string;
}
