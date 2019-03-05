Vue.component('update-ads-btn', {
    data() {
        return {
            intervals: [],
            isUpdating: false,
        }
    },
    computed: {
        accounts: function () {
            return window.ModelUserData.getAccounts();
        }
    },
    methods: {
        /**
         * Начать обновление всех аккаунтов
         */
        startUpdating() {
            /**
             * Только те аккаунты, у которых есть интервал, логин и пароль
             */
            let accounts = this.accounts.filter(oAccount => parseInt(oAccount.updateInterval) && oAccount.login && oAccount.password);

            function updateAccount(oAccount) {
                let oData = [
                    {name: 'accountId', value:oAccount.id},
                    {name: 'site', value:oAccount.siteName}
                ];
                $.ajax({
                    url:     '/ajax',// URL, куда отправлять запрос
                    data:    oData,
                    timeout: 1000 * 60* 60, // Время ожидания ответа от сервера
                    //type:     'POST',
                    // success: response => console.log(response),
                    error:   error => console.log(error)
                });
            }

            accounts.forEach(oAccount => {
                    let interval = setInterval(() => {
                        updateAccount(oAccount);
                    }, parseInt(oAccount.updateInterval) * 1000);
                    this.intervals.push(interval);
                    // Сразу запускаем обновление аккаунта, чтобы не ждать, когда сработает первый таймер
                updateAccount(oAccount);
            });
            this.isUpdating = true;
        },
        /**
         * Прекратить обновление объявлений
         */
        stopUpdating() {
            this.intervals.forEach(interval => clearInterval(interval));
            this.intervals = [];
            this.isUpdating = false;
        },
    },
    template: `
        <div>
            <button v-if="!isUpdating" class="btn btn-success" type="button" @click="startUpdating">Начать обновление объявлений</button>
            <button v-if="isUpdating" class="btn btn-secondary" type="button" @click="stopUpdating">Остановить обновление объявлений</button>
        </div>
    `,
});