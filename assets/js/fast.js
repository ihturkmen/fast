(function() {
    this.Fast = function(prod) {
        let botPattern = "(googlebot\/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
        let re = new RegExp(botPattern, 'i');
        let userAgent = navigator.userAgent; 
        if (re.test(userAgent)) {
            return false;
        }
        let selector = document.querySelectorAll(prod.selector);
        
        selector.forEach(function(e){
            e.setAttribute("data-href",e.getAttribute('href'));
            e.setAttribute("href","javascript:;");

            e.addEventListener("click",function(a){
                const state = { }
                const title = e.getAttribute('title')
                const url = '/'+e.getAttribute('data-href');

                history.pushState(state, title, url)
                document.title = title;

                if(prod.analytics){
                    ga('send', 'pageview', url);
                }
            });
        });    
    }
}());


/*
  , b = function(t) {
    var n = t.attr("data-title")
      , i = t.attr("data-url")
      , r = t.attr("data-description")
      , o = (t.attr("data-image"),
    t.attr("data-amp"));
    e("title").text() !== n && (changeContentBottom(t),
    y(n, i),
    x(a),
    ga("send", "event", "Infinate Content", "View", i),
    ga("send", "pageview"),
    e("title").html(n),
    e("meta[name=description]").attr("content", r),
    e("meta[name=description]").attr("content", r),
    e("link[rel=amphtml]").length > 0 && o && e("link[rel=amphtml]").attr("href", o))
}
*/