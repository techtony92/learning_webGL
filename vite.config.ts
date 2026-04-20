import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
export default defineConfig({
    plugins: [tailwindcss(), glsl({
        include: [
            '**/*.glsl', '**/*.wgsl',
            '**/*.vert', '**/*.frag',
            '**/*.vs', '**/*.fs'
        ]
    })],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, "./src"),
        }
    }
})