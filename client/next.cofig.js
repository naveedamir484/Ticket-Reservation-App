module.exports ={
     webpackDevMiddleware: config =>{
          config.watchOptoins.poll =300;
          return config;
     }
}