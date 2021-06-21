const Tail = require('tail-file')
const fetch = require('node-fetch')
const argv = require('minimist')(process.argv.slice(2))

let filterChars = require('./modulos/filterChars.js');
let factoriza = require('./modulos/factoriza.js');
let getData = require('./modulos/getData.js');

let pjson = require('./package.json');

// Parametria de API
    const headers = { 'Content-Type': 'application/json' };


const ejecutor = (url, headers, directorio, app) => {
    
    let contador = 0
    let testigoDateado = ''
    let testigo = false 

    new Tail(directorio, line => {

        let lineFilter = filterChars.filterChars(line)
    
            if(lineFilter == '$l2ji$'){
                testigo = true
            } else if(lineFilter == '$l2je$'){
    
                testigo = false
    
                    fetch(url+'?routing='+app, {
                        method: 'post',
                        body:    JSON.stringify(getData.getData(testigoDateado, app)),
                        headers: headers,
                    })
                    .then(res => res.json())
                    .then(json => console.log(json));
    
                testigoDateado = ''
    
            } else {
                let varString = factoriza.factoriza(lineFilter);
                testigoDateado = testigoDateado.concat(' ', varString)
            }
    
        contador = contador + 1
    
    });
}


    if(argv.c){
        let cjson = require(argv.c);
            // console.log(cjson)
            ejecutor(cjson.server+cjson.varset+'/_doc', headers, cjson.logfile, 'Massa ETL')
            
    } 
    // else if(argv.l && argv.s && argv.p) {
    //     console.log(argv.l + argv.s + argv.p)
    //     ejecutor(cjson.s+cjson.varset+'/_doc', headers, cjson.logfile, 'Massa ETL')
    // } 
    else if(argv.h){

console.log("\x1b[5m",`
MESSA v${pjson.version}
`);
console.log("\x1b[37m",`
    Parametria
        Argumento           Descripcion                     Tipo    Notas
        -c=''               JSON File con Configuracion     str     
        -h                  Ayuda
        
    > Ejemplo 
    
        messa.exe -s='localhost' -p='3306' -p='/var/logs/apache.log'

    > Ejemplo JSON Config File `);
console.log('\x1b[33m%s\x1b[0m',`
            {
                "name": "WSo2",
                "server": "http://127.0.0.1:9200",
                "varset": "/index/app",
                "port": "3306",
                "logfile": "/var/www/log.fs"
            }
`)
    } else {
        console.log ("\x1b[1m%s\x1b[0m", 
        ` No se obtuvo ningun parametro ni archivo de configuracion, obtenga ayuda con el tag -h `)
    }