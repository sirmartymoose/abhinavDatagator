cLog = function(msg){
    if(config.cLog == true) {
        console.log(msg)
    }
}

roundTwoDigits = function(num){
    return Math.round(num * 100) / 100
}