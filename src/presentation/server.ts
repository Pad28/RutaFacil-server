import path from "path";
import express, { Application, Router } from "express";
import cors from 'cors';
import compression from 'compression';

interface ServerOptions {
    port: number;
    publicPaht: string;
    routes: Router;

}

export class Server {

    private readonly app: Application;
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor( options: ServerOptions ) {
        const { port, publicPaht, routes } = options;
        
        this.app = express();
        this.port = port;
        this.publicPath = publicPaht;
        this.routes = routes;
    }

    public async start() {

        // Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(cors());
        this.app.use(compression());

        // Public folder
        this.app.use(express.static( path.join(__dirname + `/../../${this.publicPath}`) ));
        
        // Routes
        this.app.use(this.routes);
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, `../../${this.publicPath}`, 'index.html'));
        });

        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}