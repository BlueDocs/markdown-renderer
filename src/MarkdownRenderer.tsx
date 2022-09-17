import { defineComponent, toRefs, computed } from 'vue';
import { parse } from './parse';
import { MarkdownTokenRenderer } from './MarkdownTokenRenderer';

/**
 * Markdown 渲染结果组件
 */
export const MarkdownRenderer = defineComponent({
    name: 'MarkdownRenderer',
    props: {
        content: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        const { content } = toRefs(props);

        const tokens = computed(() => parse(content.value));

        return () => <MarkdownTokenRenderer tokens={tokens.value} />;
    },
});
