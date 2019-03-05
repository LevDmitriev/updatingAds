Vue.component('index', {
    props: {
        title: String,
        sites: Array,
        accounts: Array,
    },
    template: `
    <div class="vue-index-component">
        <h1>{{title}}</h1>
        <update-ads-btn class="mb-3"></update-ads-btn>
        <div class="row">
            <site-update-block v-for="(site, index) in sites"
                :siteName="site.name"
                :propAccounts="site.arAccounts"
                :propAccountFields="site.arAccountFields"
                :key="index"
            ></site-update-block>
        </div>
    </div>
    `,
});