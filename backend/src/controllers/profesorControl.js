const profControl = {};
const db = require("./database.js");
//estControl.getEstudiantes = (req,res)=>res.send('<h1>Lista de estudiantes POO P103</h1><h2>buenas noches</h1>');

//coordinadores
//todos los datos
profControl.getCoordinadores = (req,res)=>res.json(db.coordinador);
//GET
profControl.getCoordinador = (req,res)=>{
    const coord = db.coordinador.find(
        (prof)=>prof.nombre == req.params.nombre
    );
    res.json(coord);
}
//POST
profControl.postCoordinador = (req,res)=>{
    const {nombre,edad} = req.body;
    if(!nombre || !edad){
        res.status(400).send("Datos incompletos {nombre, edad}");
        return;
    }
    const prof = {
        nombre,
        edad
    }
    //verificacion de nombre repetido
    const validarProf = db.coordinador.find(
        (est)=>est.nombre == nombre
    );
    //codigo de error 400 (BAD REQUEST)
    if (validarProf){
        res.status(400).send("El profesor ingresado tiene un Nombre repetido");
        return;
    }
    db.coordinador.push(prof);
    db.updateDB();
    res.send('Coordinador ingresado con éxito');
}
//PUT
profControl.putCoordinador = (req,res)=>{
    const {edad} = req.body;

    if(!edad){
        res.status(400).send("Datos incompletos {edad}");
        return;
    }
    const coord = db.coordinador.find(
        (prof)=>prof.nombre == req.params.nombre
    );
    if (!coord){
        res.status(400).send("No se encuentra al coordinador");
        return;
    }
    coord.edad = edad;
    db.updateDB();
    res.send('Coordinador actualizado');
}
//DELETE
profControl.deleteCoordinador = (req,res)=>{
    const index = db.coordinador.findIndex(
        (prof)=>prof.nombre == req.params.nombre
    );
    if(index < 0){
        res.status(400).send("Nombre de profesor no encontrado");
        return;
    }
    db.coordinador.splice(index,1);
    db.updateDB();
    res.send('Coordinador eliminado');
}




//practico
//todos los datos
profControl.getPracticos = (req,res)=>res.json(database.practica);
//GET
profControl.getPractico = (req,res)=>{
    const pract = db.practica.find(
        (prof)=>prof.nombre == req.params.nombre
    );
    res.json(pract);
}
//POST
profControl.postPractico = (req,res)=>{
    const {nombre,edad} = req.body;
    if(!nombre || !edad){
        res.status(400).send("Datos incompletos {nombre, edad}");
        return;
    }
    const prof = {
        nombre,
        edad
    }
    //verificacion de nombre repetido
    const validarProf = db.practica.find(
        (est)=>est.nombre == nombre
    );
    //codigo de error 400 (BAD REQUEST)
    if (validarProf){
        res.status(400).send("El profesor ingresado tiene un Nombre repetido");
        return;
    }
    db.practica.push(prof);
    db.updateDB();
    res.send('Coordinador ingresado con éxito');
}
//PUT
profControl.putPractico = (req,res)=>{
    const {edad} = req.body;

    if(!edad){
        res.status(400).send("Datos incompletos {edad}");
        return;
    }
    const pract = db.practica.find(
        (prof)=>prof.nombre == req.params.nombre
    );
    if (!pract){
        res.status(400).send("No se encuentra al profesor de practico");
        return;
    }
    pract.edad = edad;
    db.updateDB();
    res.send('Profesor de practico actualizado');
}
//DELETE
profControl.deletePractico = (req,res)=>{
    const index = db.practica.findIndex(
        (prof)=>prof.nombre == req.params.nombre
    );
    if(index < 0){
        res.status(400).send("Nombre de profesor no encontrado");
        return;
    }
    db.practica.splice(index,1);
    db.updateDB();
    res.send('Profesor de practica eliminado');
}




module.exports = profControl;
