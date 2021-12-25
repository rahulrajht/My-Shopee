const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry:path.join(__dirname,"src","index.js"),
    module:{
        rules:[
            {
                test: /\.svg$/,
                use: "svg-inline-loader",
            },
            {
                test: /\.css$/i,
                use: ["style-loader" , "css-loader"],
            },
            {
                test: /\.(js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader: "babel-loader",
                    options:{
                        presets:['@babel/preset-env' , '@babel/preset-react']
                    },
                },  
            },

        ]
    },
    output:{
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    plugins: [new HtmlWebpackPlugin({
        template:path.join(__dirname,"src","index.html"),
    })],
};
