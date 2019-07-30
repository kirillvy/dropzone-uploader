const path = require("path");

module.exports = ({config, mode}) => {
	config.module.rules.push(
		{
			test: /\.ts(x)?$/,
			include: [
				path.resolve(__dirname, "../src"),
			],
			use: [
				require.resolve("ts-loader"),
				require.resolve("react-docgen-typescript-loader"),
			],
		}
	);


	config.resolve.extensions.push(".ts", ".tsx");

		config.optimization = {
			splitChunks: {
				chunks: 'all'
			}
	  };

	return config;
};
