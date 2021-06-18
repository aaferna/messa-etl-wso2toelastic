const Tail = require('tail-file');
const fetch = require('node-fetch');
const Ajv = require("ajv")
const ajv = new Ajv() 
let directorio = 'D:\\ELK\\wso2am-4.0.0\\wso2am-4.0.0\\repository\\logs\\wso2carbon.log';
let contador = 0
let testigoDateado = ''
let testigo = false

// Parametria de API
    const url = 'http://127.0.0.1:9200/my-index-000001/_doc';
    const headers = { 'Content-Type': 'application/json' };

const filterChars = (data) => {
    prereturn = data.replace("\t", "")
    prereturn = prereturn.replace("\r", "")
    return prereturn.trim()
}

const factoriza = (data) => {
    return data.toString().replace(/\\/g, '/')
}

const getData = (data) => {

    const arr = data.split(' _&!_ ')
    const source = new Map();
    const mapToObj = (map) => {
        const obj = {}
        for (let [k,v] of map)
          obj[k] = v
        return obj
    }

    arr.map((val, index)=>{

        if(index == 1){ source.set("app", val); }
        if(index == 2){ source.set("date", val); }
        if(index == 3){ source.set("type", val); }
        if(index == 4){ source.set("runner", val); }
        if(index == 5){ source.set("message", val); }
    })

    return mapToObj(source);
}   

const postData = (url, headers, raw) => {
 
    fetch(url, {
        method: 'post',
        body:    JSON.stringify(raw),
        headers: headers,
    })
    .then(res => res.json())
    .then(json => console.log(json));
    
}

const runner = new Tail(directorio, line => {

    let lineFilter = filterChars(line)

        if(lineFilter == '$l2ji$'){
            testigo = true
        } else if(lineFilter == '$l2je$'){
            testigo = false
            let rs = postData(url, headers, getData(testigoDateado))
            // console.log(rs)
            testigoDateado = ''
        } else {
            let varString = factoriza(lineFilter);
            testigoDateado = testigoDateado.concat(' ', varString)
        }

    contador = contador + 1

});
