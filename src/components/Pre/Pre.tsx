import { computed, defineComponent, toRefs } from 'vue';
import highlight from 'highlight.js/lib/core';
import plaintext from 'highlight.js/lib/languages/plaintext';
import { useMarkdownRendererContext } from '../../context';

highlight.registerLanguage('plaintext', plaintext);

export const Pre = defineComponent({
    name: 'PreRenderer',
    props: {
        content: {
            type: String,
            default: '',
        },
        language: {
            type: String,
            default: 'plaintext',
        },
    },
    setup(props) {
        const { content, language } = toRefs(props);

        const { createNamespace } = useMarkdownRendererContext();

        const highlighted = computed(() => {
            let _lang = language.value || 'plaintext';

            if (!highlight.getLanguage(_lang)) {
                if (process.env.NODE_ENV !== 'production') {
                    console.warn(`[MarkdownRenderer]: 未注册语言 ${_lang}，目前渲染为 plaintext`);
                }
                _lang = 'plaintext';
            }

            return highlight.highlight(content.value, { language: _lang }).value;
        });

        return () => {
            return <pre class={createNamespace('pre')} innerHTML={highlighted.value} />;
        };
    },
});
