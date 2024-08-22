import server from "./server";
import { PORT } from "./config/env";
import "reflect-metadata";
import { AppDataSource }  from "./config/data-source";


AppDataSource.initialize()
   .then( res => {
      console.log("Database connected");
      server.listen(PORT, () => {
         console.log(`Server listening on port ${PORT}`);
      });
   })


/*
server.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`);
});
*/