const Dotenv = require('dotenv-webpack');

module.exports = {
	pwa: {
		name: "Quran App",
		themeColor: "#04c45b",

		workboxOptions: {
			skipWaiting: true
		},
		icons: {
			favicon32: 'img/icons/favicon-32x32.png',
			favicon16: 'img/icons/favicon-16x16.png',
			appleTouchIcon: 'img/icons/apple-icon-152x152.png',
			maskIcon: 'img/icons/maskable_icon_x192.png',
			msTileImage: 'img/icons/ms-icon-144x144.png'
		}
	},
	css: {
		loaderOptions: {
			sass: {
				additionalData: `
				@import "@/scss/_variables.scss";
				@import "@/scss/_main.scss";
				`
			}
		}
	},

	configureWebpack: {
		plugins: [
		new Dotenv()
		],

	}
};