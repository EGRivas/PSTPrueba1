const estControl = {};
const db = require("./database.js");
//estControl.getEstudiantes = (req,res)=>res.send('<h1>Lista de estudiantes POO P103</h1><h2>buenas noches</h1>');
//estControl.getEstudiantes = (req,res)=>res.json(database.estudiantes);
//creacion API Rest
//getters
estControl.getEstudiantes = (req,res)=>res.json(db.estudiantes);
//estControl.getEstudiante = (req,res)=>res.json({mensaje: "Estudiante 1"});
estControl.getEstudiante = (req,res)=>{
    const estudiante = db.estudiantes.find(
        (est)=>est.id == req.params.id
    );

    res.json(estudiante);
}

//post
//estControl.postEstudiante = (req,res)=>res.json({mensaje: "Estudiante agregado"});
estControl.postEstudiante = (req,res)=>{
    const {id, nombre,apellido} = req.body;
    if(!id || !nombre || !apellido){
        res.status(400).send("Datos incompletos {id, nombre, apellido}");
        return;
    }
    const estudiante = {
        id,
        nombre,
        apellido
    }
    //verificacion de la ID repetida
    const validarEst = db.estudiantes.find(
        (est)=>est.id == id
    );
    //codigo de error 409 (CONFLICT)
    if (validarEst){
        res.status(409).send("El estudiante ingresado tiene una ID repetida");
        return;
    }


    db.estudiantes.push(estudiante);
    db.updateDB();
    res.send('Estudiante ingresado con éxito');
    
}
//put
//estControl.putEstudiante = (req,res)=>res.json({mensaje: "Estudiante actualizado"});
estControl.putEstudiante = (req,res)=>{
    const {nombre,apellido} = req.body;

    if(!nombre || !apellido){
        res.status(400).send("Datos incompletos {nombre, apellido}");
        return;
    }
    const estudiante = db.estudiantes.find(
        (est)=>est.id == req.params.id
    );
    if (!estudiante){
        res.status(400).send("No se encuentra al estudiante");
        return;
    }
    estudiante.nombre = nombre;
    estudiante.apellido = apellido;
    db.updateDB();
    res.send('Estudiante actualizado');
}

//delete
//estControl.deleteEstudiante = (req,res)=>res.json({mensaje: "Estudiante eliminado"});
estControl.deleteEstudiante = (req,res)=>{
    const index = db.estudiantes.findIndex(
        (est)=>est.id == req.params.id
    );
    if(index < 0){
        res.status(400).send("Id de estudiante no encontrado");
        return;
    }
    db.estudiantes.splice(index,1);
    db.updateDB();
    res.send('Estudiante eliminado');
}


module.exports = estControl;
