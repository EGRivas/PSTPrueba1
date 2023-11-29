const {Router}=require('express');
const router = Router();

//const {getPractico,getCoordinador} = require('../controllers/profesorControl.js');

//creacion API Rest
const {getCoordinadores,getCoordinador,postCoordinador,putCoordinador,deleteCoordinador,getPracticos,getPractico,postPractico,putPractico,deletePractico} = require ('../controllers/profesorControl.js');
//ruta coordinador
router.route('/coordinador')
    .get(getCoordinadores)
    .post(postCoordinador);

router.route('/coordinador/:nombre')
    .get(getCoordinador)
    .put(putCoordinador)
    .delete(deleteCoordinador);


//ruta practico
router.route('/practico')
    .get(getPracticos)
    .post(postPractico);
router.route('/practico/:nombre')
    .get(getPractico)
    .put(putPractico)
    .delete(deletePractico);


module.exports = router
