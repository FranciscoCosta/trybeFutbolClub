import * as express from 'express';
import 'express-async-errors';
import teamRoutes from './routes/TeamRoutes';
import userRoutes from './routes/UserRoutes';
import matchRoutes from './routes/MatchRoutes';
import leaderboardRoutes from './routes/LeaderboardRoutes';
import errorMiddleware from './middlewares/errorHandler';
// Francisco Costa
class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();

    // Error

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use(errorMiddleware);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes():void {
    this.app.use(teamRoutes);
    this.app.use(userRoutes);
    this.app.use(matchRoutes);
    this.app.use(leaderboardRoutes);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
