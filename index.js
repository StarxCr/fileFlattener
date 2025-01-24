const fs = require("fs")

let mainDir = ""
readDirOrFile(mainDir)

function readDirOrFile(path){
    fs.readdir(path, (err, files)=>{
        if(err) console.log(err)
        let counter = 1
        files.forEach(file=>{
            let filePath = `${path}/${file}`;
            let stat = fs.statSync(filePath)
            let isDir = stat.isDirectory()
            if(isDir){
                readDirOrFile(filePath)
            }
            else{
                let extension = file.substring(file.length - 4)
                const date = stat.mtime
                const newDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
                let index = '000' + counter
                const newName = `${newDate} ` + index.substring(index.length-3) + extension
                console.log(newName)
                counter += 1;
                fs.renameSync(filePath, `${mainDir}/${newName}`)
            }
            })
    })
}