const swaggerAutogen = require('swagger-autogen')();

let host = process.env.NODE_ENV === 'dev' ? 'http://localhost:3000' : 'https://metawall-snow.herokuapp.com/';

const doc = {
    info: {
        title: 'week7 Imgur 圖片上傳',
        description: 'Description',
    },
    host,
    schemes: ['http', 'https'],
    securityDefinitions: {
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header', // can be 'header', 'query' or 'cookie'
            name: 'Authorization', // name of the header, query parameter or cookie
            description: '請輸入 token',
        },
    },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
