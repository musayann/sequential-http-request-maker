const axios = require('axios')

require('dotenv').config();

async function execute(){
    const limit = Number(process.env.LIMIT) || 1;
    const iterations = Number(process.env.ITERATIONS) || 1; 
    const total = limit * iterations;
    const baseURL = String(process.env.URL);
    

    let succeeded = 0;
    let failed = 0;
    let iteration = 0;

    console.log('Executing....');

    for(let i=0; i<total; i += limit){
        iteration +=1;
        const url = baseURL.replace('LIMIT_TIMES', limit).replace('STARTING_POINT', i);
        console.log('Using url:', url);

        console.log("Running iteration", iteration, "of", iterations);

        try {
            const {data} =  await axios.post(url);
            console.log(data);
            succeeded +=1;
        } catch(e){
            console.log(e);
            failed +=1;
        }
    }

    console.log('Execution ended', {
        succeeded,
        failed,
        total,
    })
}

execute();