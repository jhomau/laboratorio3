var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
res.status(200).json({
msn: "Hola mundo"
});
});
//SERVICIO2
router.post('/test', function(req, res, next) {
    req.body["msn"] = "Por el servidor";
    var data = req.body
    res.status(200).json(data);
    });
router.post('/divisa',(req,resp)=>{
    var params = req.body;
    if (params.origen==null||params.cant==null||params.destino==null){
        resp.status(500).json({
            msn:"Parametros Incorrectos",
            params
        });
        return;
    }
    var dic = {
        CAD: 1.3256384622,
        HKD: 7.8401345088,
        ISK: 124.6932654731,
        PHP: 52.1294192493,
        DKK: 6.7855130419,
        HUF: 304.6169226575,
        CZK: 23.5135872035,
        GBP: 0.8011724075,
        RON: 4.3155503045,
        SEK: 9.7030809779,
        IDR: 14112.4965918386,
        INR: 70.9474688721,
        BRL: 4.1587748796,
        RUB: 63.6425520313,
        HRK: 6.7290738889,
        JPY: 107.6524584204,
        THB: 30.5643915296,
        CHF: 0.988639462,
        EUR: 0.9088430428,
        MYR: 4.1814959556,
        BGN: 1.7775152231,
        TRY: 5.6850858857,
        CNY: 7.1070617104,
        NOK: 9.0179950922,
        NZD: 1.583931655,
        ZAR: 14.868581296,
        USD: 1,
        MXN: 19.4398800327,
        SGD: 1.3764427883,
        AUD: 1.471326002,
        ILS: 3.5040443515,
        KRW: 1193.9107516132,
        PLN: 3.9819140234,
         BO: 6.96
    }
    if(dic[params.origen] >= 1){
        var dolar = Number(params.cant)/dic[params.origen];
    }
    else{
        var dolar = Number(params.cant)*(dic[params.origen]);
    }
    if(dic[params.destino] >= 1){
        var corres = dolar*dic[params.destino];
    }else{
        var corres = dolar/dic[params.destino];
    }
    resp.status(200).json({
        "origen"  : params.origen,
        "destino" : params.destino,
        "result"  : corres
    });
});
router.post('/interes',(req,resp)=>{
    var datos = req.body;
    if (datos.monto==null||datos.tipo==null||datos.tiempo==null){
        resp.status(500).json({
            msn:"Parametros Incorrectos",
            params
        });
        return;
    }
    var tipoInteresAnual = {
        fijo  : 0.06, 
        largo : 0.1  
    }
    if(Number(datos.tiempo) >= 12){
        var interes = (tipoInteresAnual[datos.tipo]*Number(datos.monto))+(Number(datos.tiempo)*Number(datos.monto)*0.12)+Number(datos.monto)
    }
    if(Number(datos.tiempo) < 12 && Number(datos.tiempo) > 6){
        var interes = (tipoInteresAnual[datos.tipo]*Number(datos.monto))+(Number(datos.tiempo)*Number(datos.monto)*0.06)+Number(datos.monto)
    }
    if(Number(datos.tiempo) < 7 && Number(datos.tiempo) > 2){
        var interes = (tipoInteresAnual[datos.tipo]*Number(datos.monto))+(Number(datos.tiempo)*Number(datos.monto)*0.02)+Number(datos.monto)
    }
    if(Number(datos.tiempo) < 3 && Number(datos.tiempo) >= 0){
        var interes = (tipoInteresAnual[datos.tipo]*Number(datos.monto))+(Number(datos.tiempo)*Number(datos.monto)*0.01)+Number(datos.monto)
    }
    resp.status(200).json({
        "Prestamo Pedido"       : datos.monto,
        "Total a Pagar"         : interes,
        "Tiempo Limite"         : datos.tiempo+" meses Puede variar si es Interes a largo plazo (MayorValorDePago)"
    });
});
module.exports = router;