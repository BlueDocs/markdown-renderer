# Markdown Renderer

Markdown 文档渲染器

## 安装

```bash
# npm
>$ npm install @bluedocs/markdown-renderer --save

# yarn
>$ yarn add @bluedocs/markdown-renderer

# pnpm
>$ pnpm add @bluedocs/markdown-renderer
```

## 使用

### 基础渲染

```tsx
import { MarkdownRendererContextProvider, MarkdownRenderer } from '@bluedocs/markdown-renderer';

export default defineComponent({
    name: 'App',
    setup() {
        const md = '## Hello World';

        return () => {
            return (
                <MarkdownRendererContextProvider>
                    <MarkdownRenderer content={md} />
                </MarkdownRendererContextProvider>
            );
        };
    },
});
```

### Token 渲染

```tsx
import { MarkdownRendererContextProvider, MarkdownTokenRenderer, parse } from '@bluedocs/markdown-renderer';

export default defineComponent({
    name: 'App',
    setup() {
        const md = '## Hello World';

        return () => {
            return (
                <MarkdownRendererContextProvider>
                    <MarkdownTokenRenderer tokens={parse(md)} />
                </MarkdownRendererContextProvider>
            );
        };
    },
});
```

## 自定义渲染组件

### useMarkdownRendererContext

在自定义组件中，可以使用 `useMarkdownRendererContext` 来获取渲染器的上下文

```tsx
import { defineComponent } from ';
import { useMarkdownRendererContext } from '@bluedocs/markdown-renderer';

// Heading.tsx
export const Heading = defineComponent({
    name: 'Heading',
    setup(props, { slots }) {
        const context = useMarkdownRendererContext();

        return () => <h1 class={`${context.namespace}-heading`}>{slots.default?.()}</h1>;
    },
});

// App.tsx
import { MarkdownRendererContextProvider, MarkdownRenderer } from '@bluedocs/markdown-renderer';

export default defineComponent({
    name: 'App',
    setup() {
        const md = '## Hello World';

        return () => {
            return (
                <MarkdownRendererContextProvider components={{ h1: attrs => <Heading {...attrs} /> }}>
                    <MarkdownRenderer content={md} />
                </MarkdownRendererContextProvider>
            );
        };
    },
});
```

## 许可证

[MIT](./LICENSE)
