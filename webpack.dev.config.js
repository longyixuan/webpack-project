const path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'), //抽取css

function resolve (dir) {
    return path.join(__dirname, dir);
}
module.exports = {
	entry: {
		common: './js/main.js'
	},
	output: {
		path: path.join(__dirname, './dist'),
		filename: "js/[name].js"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: 'css-loader?minimize',
					fallback: 'style-loader'
				})
			},
			{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
			{
                test: /\.less/,
                use: ExtractTextPlugin.extract({
                	use: [
                		
                		{
                			loader: 'css-loader',
                			options: {
                				minimize: true
                			}
                		},
                		{
                			loader: 'autoprefixer-loader'
                		},
                		{
                			loader: 'less-loader?sourceMap',
                			options: {
                				strictMath: true,
                				noIeCompat: true
                			}
                		}
                	],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.sass/,
                use: ExtractTextPlugin.extract({
                    use: [
                        
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'autoprefixer-loader'
                        },
                        {
                            loader: 'sass-loader?sourceMap',
                            options: {
                                strictMath: true,
                                noIeCompat: true
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(gif|jpg|png|svg)\??.*$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(jpg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 1024,
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|eot|ttf)\??.*$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // limit: 1024, //设置大小会影响打包
                            name: 'font/[name].[ext]'
                        }
                    }
                ]
            }
		]
	},
	devtool:'#source-map',
	plugins: [
		new ExtractTextPlugin({
	        filename: 'css/[name].css',
            publicPath: '../'
	    }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'js/vendors.js'
        })
	],
	resolve: {
		extensions: ['.js'],
		alias: {
	      '@': resolve('src')
	    }
	}
}