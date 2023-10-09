import cluster from 'cluster';
import os from 'os';
import {dirname} from 'path';
import { fileURLToPath } from 'url';

//getting the current directory
const __dirname = dirname(fileURLToPath(import.meta.url));

//finding the number of cpu's system
const cpuCount = os.cpus().length;

console.log(`The total number of CPUs is ${cpuCount}`);
console.log(`Primary pid=${process.pid}`);
//primary process -index.js file

cluster.setupPrimary({
    exec: __dirname + '/index.js'
});

for(let i = 0; i< cpuCount; i++) {
    cluster.fork();
}

cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} has been killed`);
    console.log('Starting a new worker');
    cluster.fork();
})