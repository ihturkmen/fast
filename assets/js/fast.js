(function() {
    this.Fast = function(e) {
        let selector = document.querySelectorAll(e.selector);
        selector.forEach(function(e){
            e.setAttribute("data-href",e.getAttribute('href'));
            e.setAttribute("href","javascript:;");

            e.addEventListener("click",function(a){
                const state = { }
                const title = e.getAttribute('title')
                const url = e.getAttribute('data-href');

                history.pushState(state, title, url)
                document.title = title;
            });
        });    
    }
}());