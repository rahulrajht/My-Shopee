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
                test: /\.(css|scss)$/i,
                use: ["style-loader" , "css-loader" ,"sass-loader"],
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options:{
                    limit:10000
                }
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
        publicPath: "/"
    },
    plugins: [new HtmlWebpackPlugin({
        template:path.join(__dirname,"src","index.html"),
    })],
    resolve:{
        extensions: ['.js' , '.jsx'],
    },
    devServer:{
        historyApiFallback:true
    },
};
