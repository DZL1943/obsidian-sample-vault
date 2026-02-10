const { ipcRenderer } = require("electron");

function delegateIpcRendererSend(config, rules, transform) {
    const send = ipcRenderer.send;
    ipcRenderer.send = function (...args) {
        const [type, , e] = args;
        if (type === "request-url" && e?.url?.includes("github")) {
            for (const r of rules) {
                if (r.regex.test(e.url)) {
                    const proxy = config[r.key] || config["default"];
                    if (proxy) {
                        switch (transform) {
                            case "replace":
                                e.url = proxy.replace(/\/+$/, '') + e.url.replace(/^[^:]+:\/\/[^\/]+(\/.*|$)/, '$1');
                                break;
                            case "prepend":
                                e.url = proxy.replace(/\/?$/, '/') + e.url;
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
        { regex: /^https:\/\/raw\.githubusercontent\.com\//, key: "raw" },
        { regex: /\/releases\/download\//, key: "download" },
        { regex: /^https:\/\/github\.com\//, key: "github" }
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
                defaultValue: `{"default": "https://ghfast.top/"}`,
                description: `代理配置. 格式 {key: url}. 支持的key及优先级顺序: raw, download, github; 若未找到则用default`,
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