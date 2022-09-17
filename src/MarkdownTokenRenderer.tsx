import { defineComponent, h, PropType, toRefs } from 'vue';
import { useMarkdownRendererContext } from './context';
import { MarkdownToken } from './interfaces';
import { isMarkdownCodeBlock, isMarkdownElement, isMarkdownText } from './utils';

const DynamicRenderer = defineComponent({
    name: 'DynamicRenderer',
    props: {
        tag: {
            type: String,
            required: true,
        },
        attrs: {
            type: Object as PropType<Record<string, string>>,
            default: () => ({}),
        },
    },
    setup(props, { slots }) {
        const { attrs } = toRefs(props);

        const { dynamicComponents } = useMarkdownRendererContext();

        const createComponent = dynamicComponents[props.tag] || dynamicComponents['p'];

        return () => h(createComponent(attrs.value), slots.default);
    },
});

export const MarkdownTokenRenderer = defineComponent({
    name: 'MarkdownTokenRenderer',
    props: {
        tokens: {
            type: Array as PropType<MarkdownToken[]>,
            default: () => [],
        },
    },
    setup(props) {
        const { tokens } = toRefs(props);

        const { namespace } = useMarkdownRendererContext();

        return () => {
            const elements = (function render(t: MarkdownToken[]) {
                return t.map(item => {
                    if (isMarkdownText(item)) {
                        return item.content;
                    }

                    if (isMarkdownCodeBlock(item)) {
                        return <DynamicRenderer tag='pre' attrs={{ ...item.attrs, content: item.content }} />;
                    }

                    if (isMarkdownElement(item)) {
                        return (
                            <DynamicRenderer tag={item.tag} attrs={item.attrs}>
                                {item.children?.length && render(item.children)}
                            </DynamicRenderer>
                        );
                    }

                    return null;
                });
            })(tokens.value);

            return <div class={namespace}>{elements}</div>;
        };
    },
});
