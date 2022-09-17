import { defineComponent } from 'vue';
import { useMarkdownRendererContext } from '../../context';

export const Code = defineComponent({
    name: 'CodeRenderer',
    setup(props, { slots }) {
        const { createNamespace } = useMarkdownRendererContext();
        return () => {
            return <code class={createNamespace('code')}>{slots.default?.()}</code>;
        };
    },
});
