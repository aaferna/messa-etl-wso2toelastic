const fs = require('fs');

exports.logger = (di, fi, data) => {
    const hoy = new Date()
    const today = hoy.toISOString().slice(0, 10)
    const time = hoy.getHours()+':'+hoy.getMinutes()+':'+hoy.getSeconds()

    fs.access(di+fi+"-"+today+".messa", fs.F_OK, (err) => {
        if (err) {
            fs.writeFile(di+fi+"-"+today+".messa", time+' > '+data+"\n", function(err) {
                if(err) throw err;
            });
        } else {
            fs.appendFile(di+fi+"-"+today+".messa", time+' > '+data+"\n", function (err) {
                if (err) throw err;
            });
        }
    })
    
}

