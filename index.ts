import express from 'express';
import bodyParser from "body-parser";
import {logger} from "./src/logger/winston";
import * as Sentry from"@sentry/node";
import * as Tracing from"@sentry/tracing";

const port = 3000;

const app =express();

app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     try {
//         res.end("<h1>Hello winston!</h1>")
//         throw new Error("Error test winston");
//     } catch (err) {
//         logger.error(err)
//     }
// })


Sentry.init({
    dsn : "https://66328cdafce8450e80b242f671b91eb9@o1417692.ingest.sentry.io/6760360",
    integrations: [
        new Sentry.Integrations.Http({tracing:true}),
        new Tracing.Integrations.Express({app})
    ],
    tracesSampleRate :1.0
})

app.use(Sentry.Handlers.requestHandler());

app.use(Sentry.Handlers.tracingHandler());

app.get("/", function rootHandler(req, res) {
    res.end("Hello world!");
});

app.use(Sentry.Handlers.errorHandler());

app.use(function onError(err, req, res, next){
    res.statusCode = 500;
    res.end(res.sentry + '\n')
})

app.get('/debug-sentry',function mainHandle(req,res){
    throw new Error("My first sentry error!!")
})

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
});