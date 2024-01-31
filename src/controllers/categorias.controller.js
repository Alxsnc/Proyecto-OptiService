import { Categoria } from "../models/categoria.model.js";

export const getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll({
            order: [
                ['id_categoria', 'DESC'],
            ],
        });
        res.json({
        data: categorias,
        });
    } catch (error) {
    }
};