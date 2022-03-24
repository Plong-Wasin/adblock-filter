(() => {
    function ready(fn: () => void): void {
        if (document.readyState != "loading") {
            fn();
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }
    function run(){
        const currentHost = new URL(location.href).host;
        let elements: NodeListOf<HTMLAnchorElement> | HTMLAnchorElement[] =
            document.querySelectorAll<HTMLAnchorElement>(
                `a[target="_blank"],a[rel="nofollow"]`
            );
        // filter offsetwidth != 0
        elements = Array.from(elements).filter(
            (element) => element.offsetWidth != 0
        );
        // unique
        elements = Array.from(new Set(elements));
        let str = "";
        const exceptHost = ["www.facebook.com", "bit.ly"];
        elements.forEach((el) => {
            const url = new URL(el.href);
            const host = url.hostname;
            if (host !== currentHost && !exceptHost.includes(host)) {
                str = `${str}\n##a[href*="${host}"i]`;
            } else if (host === "bit.ly") {
                str = `${str}\n##a[href*="${host}${url.pathname}"i]`;
            }
        });
        GM_setClipboard(str);
    }
    ready(() => {
        GM_registerMenuCommand("Copy Adblock Filter", run);
    });
})();
