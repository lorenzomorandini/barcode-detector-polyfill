import esbuild from 'esbuild'
import { copy } from 'esbuild-plugin-copy'
import { replace } from 'esbuild-plugin-replace'
import { ZBAR_WASM_REPOSITORY } from '@undecaf/barcode-detector-polyfill/zbar-wasm'

const options = {
    entryPoints: ['./src/main.js'],
    bundle: true,
    outfile: '../docs/example/js/main.js',
    format: 'esm',
    target: 'es2020',
    minify: true,
    sourcemap: false,
    plugins: [
        replace({
            values: {
                // Replaces the repository URL with a local reference
                [ZBAR_WASM_REPOSITORY]: '@undecaf/zbar-wasm',
                '/dist/main.js': '',
                '/dist/index.js': '',
            },
        }),

        copy({
            assets: {
                from: ['node_modules/@undecaf/zbar-wasm/dist/zbar.wasm'],
                to: ['.'],
            },
        }),
    ],
}

console.log(await esbuild.build(options))
