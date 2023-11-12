module.exports = {    
  devServer: {      
    proxy: {        
      '/api': {          
        target: 'http://localhost:3306',          
        changeOrigin: true,          
        pathRewrite: {            
          '^/api': ''          
        }        
      }     
    }    
  }
}