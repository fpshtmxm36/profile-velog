function textEllipsis(width) {
    let el = document.querySelector('.log-title');
    let text;

    if (typeof el.getSubStringLength !== "undefined") {
        text = el.textContent;
        var len = text.length;
        while (el.getSubStringLength(0, len--) > width) {
            text = text.slice(0, len) + "...";
        }
    } else if (typeof el.getComputedTextLength !== "undefined") {
        while (el.getComputedTextLength() > width) {
            text = text.slice(0,-1);
            text = text + "...";
        }
    } else {
        while (el.getBBox().width > width) {
            text = text.slice(0,-1);
            text = text + "...";
        }
    }

    return text;
}

export default { textEllipsis };