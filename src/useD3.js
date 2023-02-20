import * as d3 from 'node_modules/d3/dist/d3.js';
        
export default function wrap() {
    var self = d3.select(this),
        textLength = self.node().getComputedTextLength(),
        text = self.text();
    while (textLength > (width - 2 * padding) && text.length > 0) {
        text = text.slice(0, -1);
        self.text(text + '...');
        textLength = self.node().getComputedTextLength();
    }
    var g = d3.select('.log-title');

    g.text(function(d) { return d.name; }).each(wrap);
}