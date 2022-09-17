import { computed, defineComponent, toRefs } from 'vue';
import { useMarkdownRendererContext } from '../../context';

export const Link = defineComponent({
    name: 'LinkRenderer',
    props: {
        href: String,
    },
    setup(props, { slots }) {
        const { href } = toRefs(props);

        const { createNamespace } = useMarkdownRendererContext();

        const attrs = computed(() => {
            if (href.value && /^(\.\.)?[/#]/.test(href.value)) {
                return { href: href.value };
            }

            return {
                href: href.value,
                target: '_blank',
                rel: 'noreferrer',
            };
        });

        return () => {
            return (
                <a class={createNamespace('link')} {...attrs.value}>
                    {slots.default?.()}
                </a>
            );
        };
    },
});
