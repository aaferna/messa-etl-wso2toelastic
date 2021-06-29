exports.factoriza = (data) => {
    return data.toString().replace(/\\/g, '/')
}
exports.filterChars = (data) => {
    prereturn = data.replace("\t", "")
    prereturn = prereturn.replace("\r", "")
    return prereturn.trim()
}
exports.jsonStructor = (data, app) => {

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
