(function() {
    this.Fast = function(prod) {
        var botPattern = "(googlebot\/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
        var re = new RegExp(botPattern, 'i');
        var userAgent = navigator.userAgent; 
        if (re.test(userAgent)) {
            return false;
        }
        var selector = document.querySelectorAll(prod.linkSelector);
        
        selector.forEach(function(e){
            e.addEventListener("click",function(a){
                const state = { }
                const url = e.getAttribute('href');

                fetch(url)
                .then(function(response) {
                    return response.text()
                })
                .then(function(html) {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(html, "text/html");

                    //Get Title
                    title = doc.head.querySelector("title").textContent;
                    document.title = title;

                    //Get Content
                    body = doc.body.querySelector(prod.targetSelector).innerHTML;
                    document.querySelector(prod.localSelector).innerHTML = body;

                    //Change URL
                    history.pushState({}, title, url)

                    if (prod.onOpened !== undefined) {
                        prod.onOpened(e);
                    }
                })
                .catch(function(err) {  
                    if (prod.onError !== undefined) {
                        prod.onError(e);
                    }
                    console.log('Failed to fetch page: ', err);  
                });

                if(prod.analytics){
                    ga('send', 'pageview', url);
                }

                a.preventDefault(); //prevent default  behaviour
                return false; //also return false
            });
        });    
    }


}());
window.onpopstate = function(event) {
    console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
};

new Fast({
    localSelector:"#pageContent",
    targetSelector:"#pageContent",
    linkSelector:"a.redirectLink",
    analytics:false,
    onBefore:function(e){
        console.log(e);
    },
    onFinished:function(e){
        console.log(e);
    },
    //onError:function(e){alert("Error!");},
});