import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
    plugins: [
        istanbul({
            include: 'src/**/*',
            exclude: ['node_modules', 'cypress/'],
            extension: ['.js', '.jsx'],
            cypress: true
        })
    ]
});
