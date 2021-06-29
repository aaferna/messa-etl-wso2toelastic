const Tail = require('tail-file')
const fetch = require('node-fetch')
const argv = require('minimist')(process.argv.slice(2))
const f = require('./modulos/factoriza.js');
const l = require('./modulos/logger.js');

let pjson = require('./package.json');

const headers = { 'Content-Type': 'application/json' };

const ejecutor = (url, headers, directorio, app, logc) => {

    let contador = 0
    let testigoDateado = ''

    const traking = new Tail(directorio, line => {

        let lineFilter = f.filterChars(line)
    
            if(lineFilter == '$l2ji$'){ testigo = true } 
            else if(lineFilter == '$l2je$'){
                testigo = false
                let data = f.jsonStructor(testigoDateado, app)
                    fetch(url, {
                        method: 'post',
                        body:    JSON.stringify(data),
                        headers: headers
                    })
                    .then(res => res.json())
                    .then(json => {
                        if (logc.active == true){
                            l.logger(logc.directory, app, "Post " + JSON.stringify(data) + "\nResponse " + JSON.stringify(json))
                        }
                    });
    
                testigoDateado = ''
            } else {
                let varString = f.factoriza(lineFilter);
                testigoDateado = testigoDateado.concat(' ', varString)
            }
    
        contador = contador + 1
    
    });

    traking.on('error', err => console.log("\x1b[31m%s\x1b[0m", 'Encontramos un '+ err) );
}


    if(argv.c){
        let cjson = require(argv.c);
            //console.log(cjson)
            ejecutor(cjson.server+cjson.varset+'/_doc', headers, cjson.logfile, cjson.app, cjson.log)
    } 
    else if(argv.h){

console.log("\x1b[5m",`
MESSA v${pjson.version}`);
console.log("\x1b[37m%s\x1b[0m",`
    Parametria
        Argumento           Descripcion                     Tipo    Notas
        -c=''               JSON File con Configuracion     str     Archivo de Configuracion
        -h                  Ayuda
    
    > Ejemplo 
    
        messa.exe -c='./config.json'

    Aviso
        - Si utiliza el sistema de Logs de Messa, es necesario que cree el directorio absoluto 
        para que Messa pueda crear los archivos de Log de manera correcta
    

    > Mas Info https://github.com/gusgeek/messa-etl-wso2toelastic 
    
    `);

    } else {
        console.log ("\x1b[1m%s\x1b[0m", 
        ` No se obtuvo ningun parametro ni archivo de configuracion, obtenga ayuda con el tag -h `)
    }