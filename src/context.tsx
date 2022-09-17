import { createContext } from 'vc-state';
import { MarkdownRendererComponents } from './interfaces';
import { Heading, Blockquote, Pre, Link, Code, Paragraph } from './components';

export interface MarkdownRendererContextProviderProps {
    namespace?: string;
    components?: MarkdownRendererComponents;
}

const defaultComponents: MarkdownRendererComponents = {
    h1: attrs => <Heading level={1} {...attrs} />,
    h2: attrs => <Heading level={2} {...attrs} />,
    h3: attrs => <Heading level={3} {...attrs} />,
    h4: attrs => <Heading level={4} {...attrs} />,
    h5: attrs => <Heading level={5} {...attrs} />,
    h6: attrs => <Heading level={6} {...attrs} />,
    blockquote: attrs => <Blockquote {...attrs} />,
    pre: attrs => <Pre {...attrs} />,
    a: attrs => <Link {...attrs} />,
    code: attrs => <Code {...attrs} />,
    p: attrs => <Paragraph {...attrs} />,
};

/**
 * Markdown 渲染器 context
 */
const [MarkdownRendererContextProvider, useMarkdownRendererContext] = createContext(
    (props: MarkdownRendererContextProviderProps) => {
        const { components = {}, namespace = 'renderer' } = props;

        const dynamicComponents = Object.assign({}, defaultComponents, components);

        function createNamespace(...names: string[]) {
            return names.reduce((t, c) => `${t}-${c}`, namespace);
        }

        return {
            namespace,
            createNamespace,
            dynamicComponents,
        };
    }
);

export { MarkdownRendererContextProvider, useMarkdownRendererContext };
