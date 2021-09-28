const { sequelize, firma } = require("../configuracion/configuracion.js");

module.exports.mostrarPaises= async (objPais) => {

    let {nombre} = objPais;

    query = "SELECT * FROM paises WHERE 1 = 1"
    if (nombre) {query += " AND nombre LIKE :nombre";} 
    
    const respuesta =
        sequelize.query(query, {
            replacements: { nombre: `%${nombre}%`},
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}


module.exports.crearPais = async (objPais) => {

    objPais.forEach(function (item, index) {

        const nombre = item.nombre;
        const region = item.region;
        const sub_region = item.sub_region;

        query = "INSERT INTO paises (nombre, region, sub_region) VALUES (:nombre, :region, :sub_region) ";

        const respuesta =
            sequelize.query(query, {
                replacements: { nombre, region, sub_region },
                type: sequelize.QueryTypes.INSERT
            });

        });
        
        return "OK";
}
module.exports.buscarPais = async (objPais) => {

    if (objPais.nombre) {
        query = "SELECT * FROM paises WHERE nombre = :nombre";
    } else {
        query = "SELECT * FROM paises";
    }

    const respuesta =
        sequelize.query(query, {
            replacements: { nombre: objPais.nombre },
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}

module.exports.eliminarPais = async (objPais) => {

    const id = objPais.id;

    if (id) {

        query = "DELETE FROM paises WHERE id = :id";

        const respuesta =
            sequelize.query(query, {
                replacements: { id },
                type: sequelize.QueryTypes.DELETE
            });

        return respuesta;

    }

}