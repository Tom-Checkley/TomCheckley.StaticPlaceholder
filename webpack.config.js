const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { env } = require("process");

const config = {
    entry: {
        main: "./src/assets/js/main.js",
    },
    target: "web",
    output: {
        filename: env.production ? "[name].bundle/[contenthash].js" : "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Tom Checkley",
            template: "src/index.html",
        }),
    ],
    devServer: {
        static: "./dist",
        hot: true,
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                            sassOptions: {
                                indentWidth: 4,
                                outputStyle: "compressed",
                            },
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
        ],
    },
};

module.exports = (env, argv) => {
    config.mode = env.production ? "production" : "development";
    config.devtool = env.production ? "source-map" : "eval";

    console.log(config);

    return config;
};
