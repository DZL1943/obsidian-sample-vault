module.exports = async (params) => {
    const { execFile } = require('child_process');

    const BROWSER = "Microsoft Edge";

    const COMMANDS = {
        darwin: (url) => execFile("open", ["-a", BROWSER, url]),
        win32: (url) => execFile("cmd", ["/c", "start", "", url]),
        linux: (url) => execFile("xdg-open", [url])
    };

    window.open = (url) => COMMANDS[process.platform](url);

    if (!window._builtInOpen) window._builtInOpen = window.open;

    const handler = (ev) => {
        const anchor = ev.target.closest('a');
        if (!anchor?.href?.startsWith('http')) return;
        ev.preventDefault();
        window.open(anchor.href);
    };

    app.plugins.plugins.quickadd.registerDomEvent(window, 'click', handler, { capture: true });
};