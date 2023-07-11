"use strict";
const autocannon = require("autocannon");

function test (url){
    const instance = autocannon({
        url,
        connections: 10,
        pipelining: 1,
        duration: 10,
    });

    autocannon.track(instance, { renderProgressBar: false });
}

test(url);