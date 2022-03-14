module.exports = function override(config, env) {
    config.resolve = {
        extensions: [".web.js", ".web.ts", ".js", ".ts", ".json"],
        fallback: {
            path: require.resolve("path-browserify"),
            url: require.resolve("url"),
        },
    }
    return config
}
