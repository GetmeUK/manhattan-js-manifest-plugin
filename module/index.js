import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import walk from 'walk'


const pluginName = 'manhattan-manifest-plugin'


export class ManhattanManifestPlugin {

    constructor(options) {

        this.options = Object.assign(
            {
                exclude: null,
                filepath: 'static-assets.json',
                presets: {},
                stripHash: (filepath) => {
                    let parts = filepath.split('.')
                    parts.splice(parts.length - 2, 1)
                    return parts.join('.')
                }
            },
            options
        )

    }

    apply(compiler) {

        compiler.hooks.beforeRun.tapAsync(pluginName, (compilation, done) => {
            // Initially remove the output path directory
            rimraf(compiler.options.output.path, done)
        })

        compiler.hooks.done.tap(pluginName, (compilation) => {

            const basePath = compiler.options.output.path
            const publicPath = compiler.options.output.publicPath

            // Compile and write out a manifest of assets within the output
            // path.
            const manifest = Object.assign({}, this.options.presets)
            const walker = walk.walk(basePath)
            const exclude = this.options.exclude

            walker.on('file', (root, fileStats, next) => {
                const relpath = path.relative(basePath, root)
                const filepath = path.join(relpath, fileStats.name)

                // Don't add excluded files to the manifest
                if (exclude && exclude.test(filepath)) {
                    return next()
                }

                // Add an entry to the manifest for the file
                const lookupPath = path.join(
                    '/',
                    this.options.stripHash(filepath)
                )
                const storedPath = publicPath + filepath
                manifest[lookupPath] = storedPath
                next()
            })

            walker.on('end', () => {
                // Write the manifest file
                fs.writeFileSync(
                    this.options.filepath,
                    JSON.stringify(manifest, null, 2)
                )
            })
        })

    }

}