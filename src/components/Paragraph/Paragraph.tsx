import { defineComponent } from 'vue';
import { useMarkdownRendererContext } from '../../context';

export const Paragraph = defineComponent({
    name: 'ParagraphRenderer',
    setup(props, { slots }) {
        const { createNamespace } = useMarkdownRendererContext();

        return () => {
            return <p class={createNamespace('paragraph')}>{slots.default?.()}</p>;
        };
    },
});
