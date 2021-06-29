const fs = require('fs');

exports.logger = (di, fi, data) => {
    const today = new Date().toISOString().slice(0, 10)

    fs.access(di+fi+"-"+today+".messa", fs.F_OK, (err) => {
        if (err) {
            fs.writeFile(di+fi+"-"+today+".messa", data+"\n", function(err) {
                if(err) return console.log(err);
            });
        } else {
            fs.appendFile(di+fi+"-"+today+".messa", data+"\n", function (err) {
                if (err) throw err;
            });
        }
    })
    
}

