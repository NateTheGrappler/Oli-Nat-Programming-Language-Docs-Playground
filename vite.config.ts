import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import mdx from '@mdx-js/rollup';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

const prettyCodeOptions = {
    theme: 'github-dark-default',
    keepBackground: false,
};

// https://vite.dev/config/
export default defineConfig({

    plugins: [mdx({

        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
        remarkPlugins: [remarkGfm],
        
    }), react()],
})
