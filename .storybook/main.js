module.exports = {
    stories: ['../src/**/*.stories.tsx'],
    addons: [
        {
            name: '@storybook/addon-docs',
            options: { configureJSX: true },
        },
        '@storybook/addon-actions',
        '@storybook/addon-toolbars',
    ],
    webpackFinal: config => {
        config.module.rules.push({
            test: /\.tsx?$/,
            use: [
                { loader: require.resolve('ts-loader') },
                { loader: require.resolve('react-docgen-typescript-loader') },
            ],
        });

        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        });

        config.resolve.extensions.push('.ts', '.tsx');
        return config;
    },
};
