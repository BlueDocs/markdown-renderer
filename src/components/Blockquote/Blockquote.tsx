import { defineComponent } from 'vue';
import { useMarkdownRendererContext } from '../../context';

export const Blockquote = defineComponent({
    name: 'BlockquoteRenderer',
    setup(props, { slots }) {
        const { createNamespace } = useMarkdownRendererContext();

        return () => {
            return <blockquote class={createNamespace('blockquote')}>{slots.default?.()}</blockquote>;
        };
    },
});
