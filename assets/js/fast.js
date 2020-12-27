/*!
 * Fast.js v1.0.0 - Fast Page Load
 *
 * Copyright (c) 2020 @ihturkmen
 * All Rights Reserved. Apache Software License 2.0
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
(function() {
    this.Fast = function(prod) {
        try {
            if (!prod.linkSelector) {
                throw "You must fill the linkSelector option";
            }
            if (!prod.fromSelector) {
                throw "You must fill the fromSelector option";
            }
            if (!prod.toSelector) {
                throw "You must fill the toSelector option";
            }
        } catch (err) {
            throw err;
        }

        // Detect BOT
        var botPattern = "(googlebot/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
        var re = new RegExp(botPattern, "i");
        var userAgent = navigator.userAgent;
        if (re.test(userAgent)) {
            return false;
        }

        function init() {
            var pageLink = document.querySelectorAll(prod.linkSelector);

            pageLink.forEach(function(e) {
                e.addEventListener("click", function(a) {
                    callPage(e.getAttribute("href"));

                    a.preventDefault();
                    return false;
                });
            });
        }

        function callPage(link) {
            if (prod.version) {
                link = link + '?v=' + prod.version;
            }

            fetch(link)
                .then(function(response) {
                    return response.text();
                })
                .then(function(html) {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(html, "text/html");

                    //Get Content
                    body = doc.body.querySelector(prod.toSelector).innerHTML;
                    document.querySelector(prod.fromSelector).innerHTML = body;

                    //Change URL
                    if (prod.changeUrl != false) {
                        history.pushState({}, title, link);
                    }
                    //Change Title
                    if (prod.changeTitle != false) {
                        var title = doc.head.querySelector("title").textContent;
                        document.title = title;
                    }

                    if (prod.onOpened != undefined) {
                        prod.onOpened(e);
                    }
                })
                .catch(function(err) {
                    if (prod.onError != undefined) {
                        prod.onError(err);
                    }
                    console.log("Failed to fetch page: ", err);
                });

            if (prod.analytics) {
                ga("send", "pageview", link);
            }
        }

        return init();
    };
})();