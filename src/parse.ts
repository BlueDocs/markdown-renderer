import Markdown from 'markdown-it';
import type Token from 'markdown-it/lib/token';
import { MarkdownElement, MarkdownText, MarkdownCodeBlock, MarkdownToken } from './interfaces';

/**
 * 解析 markdown 文本为 tokens
 */
export function parse(md: string): MarkdownToken[] {
    const stack: MarkdownToken[] = [];

    function _createElement(
        tag: string,
        attrs: Record<string, string> = {},
        children?: MarkdownToken[]
    ): MarkdownElement {
        return { tag, type: 'element', attrs, children };
    }

    function _createText(content: string): MarkdownText {
        return { type: 'text', content };
    }

    function _createCodeBlock(content: string, attrs: Record<string, string> = {}): MarkdownCodeBlock {
        return { type: 'code_block', content, tag: 'pre', attrs };
    }

    function _appendChildInStackTop(...children: MarkdownToken[]) {
        const parent = stack.at(-1);

        if (parent) {
            if (parent.children) {
                parent.children.push(...children);
            } else {
                parent.children = children;
            }
        }
    }

    return (function _parse(originTokens: Token[]): MarkdownToken[] {
        return originTokens.reduce<MarkdownToken[]>((tokens, token) => {
            const { type, tag, children, content, markup, attrs, info } = token;

            const _attrs = attrs ? Object.fromEntries(attrs) : {};

            /**
             * 解析开始标签
             *
             * 有开始标签，肯定有闭合标签
             *
             * 所以应该解析完整个 group 才算结束
             */
            if (/_open$/.test(type)) {
                // 入栈 因为 group 解析还没结束
                stack.push(_createElement(tag, _attrs));
                return tokens;
            }

            /**
             * 解析关闭标签
             *
             * 因为是关闭标签，所以栈里面一定会有 group 的开始标签
             *
             * 所以最后一个元素应该出栈
             */
            if (/_close$/.test(type)) {
                const _token = stack.pop();

                // 如果栈里没有元素，则证明 originToken 有错误，抛出错误
                if (!_token) {
                    throw new Error('Markdown 解析错误');
                }

                // 如果栈是空的，证明最外层的 group 已经解析完成，推入主 token 中
                if (!stack.length) {
                    return [...tokens, _token];
                }

                // 如果栈不是空的，证明最外层的 group 仍然没解析完成，还有别的子节点，推到上层的 group 中的 children 里
                _appendChildInStackTop(_token);

                return tokens;
            }

            /**
             * 解析行内元素
             *
             * 通常是 markup 后的元素
             *
             * 主要是内容部分
             */
            if (type === 'inline') {
                // 如果有子元素，则进行深度解析
                if (children?.length) {
                    const _tokens = _parse(children);

                    // 解析后的内容一定是最后入栈的元素，因为 inline 类型是紧跟 *_open 的元素
                    _appendChildInStackTop(..._tokens);

                    return tokens;
                }

                // 解析当前节点
                return [...tokens, _createElement(tag, _attrs)];
            }

            /**
             * 解析文本类型的元素
             *
             * 如果是空文本元素，则不解析
             */
            if (type === 'text' && content) {
                const _token = _createText(content);

                // 解析后的内容一定是最后入栈的元素，因为 text 类型是在 inline 的元素中的
                _appendChildInStackTop(_token);

                return tokens;
            }

            /**
             * 解析行内代码
             */
            if (type === 'code_inline') {
                const _token = _createElement('code', {}, [_createText(content)]);

                // 解析后的内容一定是最后入栈的元素，因为 code_inline 类型是在 inline 的元素中的
                _appendChildInStackTop(_token);

                return tokens;
            }

            /**
             * 解析代码块类型的元素
             */
            if (type === 'fence' && markup === '```') {
                return [...tokens, _createCodeBlock(content, { ..._attrs, language: info })];
            }

            /**
             * 其余未做判断的元素
             *
             * 则一律不解析
             */
            return tokens;
        }, []);
    })(new Markdown().parse(md, {}));
}
