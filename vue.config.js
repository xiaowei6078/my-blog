const path = require("path");
const UglifyPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    // baseUrl: "", // 从 Vue CLI 3.3 起已弃用，请使用publicPath。
    publicPath: "/", // 部署应用包时的基本 URL.用法和 webpack 本身的 output.publicPath 一致，但是 Vue CLI 在一些其他地方也需要用到这个值，所以请始终使用 publicPath 而不要直接修改 webpack 的 output.publicPath。
    outputDir: "dist", //当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
    assetsDir: "", //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    indexPath: "index.html", //指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    filenameHashing: true, //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
    // pages: {}, //在 multi-page 模式下构建应用 //process.env.NODE_ENV !== 'production'
    lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。设置为 true 时，eslint-loader 会将 lint 错误输出为编译警告。如果你希望让 lint 错误在开发时直接显示在浏览器中，你可以使用 lintOnSave: 'error'
    devServer: {
        //通过设置让浏览器 overlay 同时显示警告和错误：
        overlay: {
            // 错误、警告在页面弹出
            warnings: true,
            error: true
        },
        open: true,
        host: "localhost", // 允许外部ip访问
        port: 9090,
        https: false, // 启用https
        proxy: {
            "/api": {
                //如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。
                target: "http://localhost:9091",
                changeOrigin: true, // 允许websockets跨域
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },
    runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本。
    transpileDependencies: [], // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。
    productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    crossorigin: undefined, // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
    integrity: false, // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            // 为生产环境修改配置...
            config.mode = "production";
            let optimization = {
                runtimeChunk: "single",
                splitChunks: {
                    chunks: "all",
                    maxInitialRequests: Infinity,
                    minSize: 20000,
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                // get the name. E.g. node_modules/packageName/not/this/part.js
                                // or node_modules/packageName
                                const packageName = module.context.match(
                                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                                )[1];
                                // npm package names are URL-safe, but some servers don't like @ symbols
                                return `npm.${packageName.replace("@", "")}`;
                            }
                        }
                    }
                },
                minimizer: [
                    new UglifyPlugin({
                        uglifyOptions: {
                            compress: {
                                // warnings: false,
                                drop_console: true, // console
                                drop_debugger: false,
                                pure_funcs: ["console.log"] // 移除console
                            }
                        }
                    })
                ]
            };
            Object.assign(config, {
                optimization
            });
        } else {
            // 为开发环境修改配置...
            config.mode = "development";
        }
        Object.assign(config, {
            resolve: {
                alias: {
                    "@": path.resolve(__dirname, "./src"),
                    "@c": path.resolve(__dirname, "./src/components"),
                    "@p": path.resolve(__dirname, "./src/pages"),
                    "@r": path.resolve(__dirname, "./src/routes"),
                    "@s": path.resolve(__dirname, "./src/stores"),
                    "@services": path.resolve(__dirname, "./src/services")
                }
            }
        });
    }, //如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
    // chainWebpack: "", // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。
    css: {
        requireModuleExtension: true, // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
        extract: process.env.NODE_ENV === "production", //是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
        sourceMap: false // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
        // loaderOptions: {
        //     sass: {
        //         prependData: `@import "~@/variables.sass";`
        //     },
        //     scss: {
        //         prependData: `@import "~@/variables.scss";`
        //     }
        // }
    }
};
