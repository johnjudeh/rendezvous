module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        app: './src/app',
                        common: './src/common',
                        map: './src/map',
                        locations: './src/locations',
                        categories: './src/categories',
                    }
                }
            ]
        ],
    };
};
