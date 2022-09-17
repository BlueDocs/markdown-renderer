import { MarkdownCodeBlock, MarkdownElement, MarkdownText, MarkdownToken } from './interfaces';

export function isMarkdownText(token: MarkdownToken): token is MarkdownText {
    return token.type === 'text';
}

export function isMarkdownElement(token: MarkdownToken): token is MarkdownElement {
    return token.type === 'element';
}

export function isMarkdownCodeBlock(token: MarkdownToken): token is MarkdownCodeBlock {
    return token.type === 'code_block';
}
