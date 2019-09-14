//  移动端适配
(function() {
    'use strict';

    $(document).ready(function() {
        console.log("mobile.js ready!");
        //动态获取窗口大小
        var body = (document.compatMode && document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;
        var bodyWidth = body.offsetWidth;
        if (bodyWidth < 500) {
            //宽度改为100%
            document.getElementsByClassName("main")[0].style.maxWidth = "100%";
            console.log("移动端适配完成！");
        }
    });

})();