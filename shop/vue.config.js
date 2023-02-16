module.exports = {
    devServer: {
        disableHostCheck: true,
        allowedHosts: ['all']
    },
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
				@import "@/styles/main.scss";
        `
            }
        }
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules(?!(\/|\\)pdfjs-dist)/,
                    loader: 'babel-loader',
                    options: {
                        'presets': ['@babel/preset-env'],
                        'plugins': ['@babel/plugin-proposal-optional-chaining']
                    }
                }
            ],
        }
    }
};