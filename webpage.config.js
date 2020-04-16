module.exports = {
    publicPath:'./',
    lintOnSave:false,
    devServer:{
      proxy:{
          target:'http://61.149.176.246:9007'
      }
    }
  }