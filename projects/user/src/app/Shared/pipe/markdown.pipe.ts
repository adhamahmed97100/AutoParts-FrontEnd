import { Pipe, PipeTransform } from '@angular/core';
import * as hljs from 'highlight.js';

@Pipe({
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // 1️⃣ معالجة الأكواد البرمجية أولا لمنع التلاعب بها لاحقًا
    value = value.replace(
      /```([\w]+)?\n([\s\S]*?)```/g,
      (match, lang, code) => {
        const highlightedCode = lang
          ? hljs.default.highlight(code, { language: lang.trim() }).value
          : hljs.default.highlightAuto(code).value;

        return `<pre class="code-block"><code class="hljs">${highlightedCode}</code></pre>`;
      }
    );
    value = value.replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // 2️⃣ تحويل النصوص الأخرى (بدون التلاعب بالأكواد المظللة)
    let formattedValue = value
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // **نص** → <strong>نص</strong>
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // *نص* → <em>نص</em>
      .replace(/`(.*?)`/g, '<code class="inline-code">$1</code>'); // `كود` → <code>كود</code>

    // 3️⃣ تحويل الجداول Markdown إلى HTML

    // 4️⃣ استبدال الأسطر الجديدة **خارج الأكواد فقط**
    formattedValue = formattedValue.replace(/(?<!<\/?code[^>]*>)\n/g, '<br>');

    return formattedValue;
  }
}
