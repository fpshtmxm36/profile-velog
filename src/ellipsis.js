function textEllipsis(width) {
    let el = document.querySelector('.log-title');

    if (typeof el.getSubStringLength !== "undefined") {
        let text = el.textContent;
        var len = text.length;
        while (el.getSubStringLength(0, len--) > width) {
            el.textContent = text.slice(0, len) + "...";
        }
    } else if (typeof el.getComputedTextLength !== "undefined") {
        while (el.getComputedTextLength() > width) {
            text = text.slice(0,-1);
            el.textContent = text + "...";
        }
    } else {
        while (el.getBBox().width > width) {
            text = text.slice(0,-1);
            el.textContent = text + "...";
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    textEllipsis(324);
});