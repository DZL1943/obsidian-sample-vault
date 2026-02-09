const { ipcRenderer } = require("electron");

function delegateIpcRendererSend(config) {
    const send = ipcRenderer.send;
    ipcRenderer.send = function (...args) {
        const [type, , e] = args;
        if (type === "request-url" && e?.url) {
            for (const prefix in config) {
                if (e.url.startsWith(prefix)) {
                    e.url = e.url.replace(prefix, config[prefix]);
                    console.debug(e.url);
                    e.headers = {
                        ...(e.headers || {}),
                        "content-type": "application/x-www-form-urlencoded",
                        "Access-Control-Allow-Origin": "*"
                    };
                    break;
                }
            }
        }
        send.bind(ipcRenderer)(...args);
    };
}

async function start(params, settings) {
    const config = JSON.parse(settings.config || 'null');
    delegateIpcRendererSend(config);
    console.log("GitHub代理已启用");
}

module.exports = {
    entry: start,
    settings: {
        name: "GitHub Proxy",
        author: "",
        options: {
            config: {
                type: "textarea",
                defaultValue: `{
  "https://raw.githubusercontent.com/": "https://ghfast.top/https://raw.githubusercontent.com/",
  "https://github.com/": "https://ghfast.top/https://github.com/",
  "https://api.github.com/": "https://ghfast.top/https://api.github.com/"
}`,
                description:
                    "输入JSON格式的代理配置。键为原始URL前缀，值为替换后的URL前缀。",
            },
        },
    },
};
