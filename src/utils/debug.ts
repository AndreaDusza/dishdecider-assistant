export function avgTextLength(elements: JQuery): number {
    if (elements.length === 0 ) return 0;

    let totalLength = 0;
    elements.each(function() {
        totalLength += $(this).text().length;
    });
    return totalLength / elements.length;
}