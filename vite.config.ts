import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import mdx from '@mdx-js/rollup';
import rehypePrettyCode from 'rehype-pretty-code';

const prettyCodeOptions = {
    theme: 'github-dark-default',
    keepBackground: false,
};

// https://vite.dev/config/
export default defineConfig({

    plugins: [mdx({

        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
        
    }), react()],
})
