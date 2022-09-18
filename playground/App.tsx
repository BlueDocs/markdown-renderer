import { defineComponent } from 'vue';
import { MarkdownRendererContextProvider, MarkdownRenderer } from '../src';
import md from './example.md?raw';

import highlight from 'highlight.js';
import bash from 'highlight.js/lib/languages/bash';
import typescript from 'highlight.js/lib/languages/typescript';

highlight.registerLanguage('bash', bash);
highlight.registerLanguage('typescript', typescript);

export default defineComponent({
    name: 'App',
    setup() {
        return () => {
            return (
                <MarkdownRendererContextProvider>
                    <MarkdownRenderer content={md} />
                </MarkdownRendererContextProvider>
            );
        };
    },
});
