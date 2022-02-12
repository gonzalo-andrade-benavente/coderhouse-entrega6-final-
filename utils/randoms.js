const rdn = (num) => {
    let randomObj = {
        //'2' : 5
    };
    for (i = 0; i < num; i++) {
        random = Math.floor(Math.random() * (num - 1) + 1);
        if (!randomObj[random]) randomObj[random] = 0;
        randomObj[random] += 1;
    }
    return randomObj
}

process.on('message', data => {
    process.send({
        res: rdn(data)
    })
});