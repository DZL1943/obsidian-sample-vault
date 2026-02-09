const { ipcRenderer } = require("electron");

function delegateIpcRendererSend(config, rules, transform) {
    const send = ipcRenderer.send;
    const defaultKey = rules[rules.length - 1]?.key;
    
    ipcRenderer.send = function (...args) {
        const [type, , e] = args;
        if (type === "request-url" && e?.url) {
            for (const r of rules) {
                if (r.regex.test(e.url)) {
                    const proxy = config[r.key] || config[defaultKey];
                    if (proxy) {
                        const originalUrl = new URL(e.url);
                        const proxyUrl = new URL(proxy);
                        switch (transform) {
                            case "replace":
                                e.url = proxyUrl.href.replace(/\/+$/, '') + originalUrl.href.substring(originalUrl.origin.length);
                                break;
                            case "prepend":
                                e.url = proxyUrl.href.replace(/\/?$/, '/') + originalUrl.href;
                                break;
                            default:
                                break;
                        }
                        console.debug(e.url);
                        e.headers = { 
                            ...(e.headers || {}), 
                            "content-type": "application/x-www-form-urlencoded", 
                            "Access-Control-Allow-Origin": "*" 
                        };
                    }
                    break;
                }
            }
        }
        send.bind(ipcRenderer)(...args);
    };
}

async function start(params, settings) {
    const rules = [
        { regex: /^https:\/\/raw\.githubusercontent\.com\//, key: 'github-raw' },
        { regex: /^https:\/\/api\.github\.com\//, key: 'github-api' },
        { regex: /\/releases\/download\//, key: 'github-download' },
        { regex: /^https:\/\/gist\.github\.com\//, key: 'github-gist' },
        { regex: /^https:\/\/github\.com\//, key: 'github' }
    ];
    
    delegateIpcRendererSend(
        JSON.parse(settings.config || "{}"),
        rules,
        settings.transform
    );
    console.log("Proxy Enabled.");
}

module.exports = {
    entry: start,
    settings: {
        name: "GitHub Proxy",
        author: "",
        options: {
            config: {
                type: "textarea",
                defaultValue: `{"github": "https://ghfast.top/"}`,
                description: `代理配置. 格式 {key: url}. 支持的key及优先级顺序: github-raw, github-api, github-download, github-gist, github; 若未找到则用最后一个(github)`,
            },
            transform: {
                type: "dropdown",
                defaultValue: "prepend",
                options: ["prepend", "replace"],
                description: "URL转换模式. prepend: 添加代理前缀; replace: 替换URL origin"
            }
        },
    },
};