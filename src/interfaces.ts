import { VNode } from 'vue';

export type MarkdownRendererComponentAttrs = Record<string, string>;

export type MarkdownRendererComponent = (attrs: MarkdownRendererComponentAttrs) => VNode;

export type MarkdownRendererComponents = Record<string, MarkdownRendererComponent>;

export type MarkdownTokenType = 'element' | 'text' | 'code_block';

export interface MarkdownToken {
    type: MarkdownTokenType;
    children?: MarkdownToken[];
    attrs?: MarkdownRendererComponentAttrs;
}

export interface MarkdownElement extends MarkdownToken {
    tag: string;
    type: 'element';
    attrs: MarkdownRendererComponentAttrs;
}

export interface MarkdownText extends MarkdownToken {
    content: string;
    type: 'text';
}

export interface MarkdownCodeBlock extends MarkdownToken {
    tag: 'pre';
    content: string;
    type: 'code_block';
    attrs: MarkdownRendererComponentAttrs;
}
