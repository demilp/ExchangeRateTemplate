var DexTemplatePlugin = require('./dexTemplatePlugin');
module.exports = {
	publicPath: './',
	configureWebpack: {
		plugins: [new DexTemplatePlugin()]		
	}
}