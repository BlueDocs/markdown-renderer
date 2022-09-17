import { defineComponent, h, PropType } from 'vue';
import { useMarkdownRendererContext } from '../../context';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export const Heading = defineComponent({
    name: 'HeadingRenderer',
    props: {
        level: {
            type: Number as PropType<HeadingLevel>,
            required: true,
        },
    },
    setup(props, { slots }) {
        const { createNamespace } = useMarkdownRendererContext();

        return () => {
            return h(
                `h${props.level}`,
                {
                    class: [createNamespace('heading'), createNamespace(`heading${props.level}`)],
                },
                slots.default?.()
            );
        };
    },
});
