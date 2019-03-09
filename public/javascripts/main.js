$(document).ready(function () {
    window.ModelUserData = window.ProxyFabric.createProxy('Model/ModelUserData', false);
    window.ModelAccountFields = window.ProxyFabric.createProxy('Model/ModelAccountFields', true);
    window.app = new Vue({
        el: '#app'
    });
});
