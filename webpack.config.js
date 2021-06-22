const { env } = require('process');

path = require('path');

module.exports = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            // To generate a different build for each language, set the DEFAULT_LANGUAGE environment variable
            '@i18n$': path.resolve(__dirname, 'src/messages/en.json')
        }
    },
    module: {
        rules: [
          {
            test: [/\bmessages\.(json|ya?ml)$/, /\.properties$/],
            type: 'javascript/auto', // required by Webpack for JSON files
            use: [
                    {
                        loader: '@messageformat/loader',    
                        options: { locale: ['en','es'] }        
                    }
                ]
            }
        ]    
    }
};
