function divideIntoParagraphss (text: string, sentencesPerParagraph: number): string[] {
    let sentences = text.match(/[^.!?]+[.!?]+/g);
    if (!sentences) return [text];
    let paragraphs: string[] = [];
    for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
        let paragraph = sentences.slice(i, i + sentencesPerParagraph).join(' ');
        paragraphs.push(paragraph.trim());
    }
    return paragraphs
}
export default divideIntoParagraphss


