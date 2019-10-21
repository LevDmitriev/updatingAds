Vue.component('update-ads-btn', {
    data() {
        return {
            intervals: [],
            isUpdating: false,
            curDate: new Date(),
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
            let self = this;
            /**
             * Отфильтрованные аккаунты
             */
            let accounts = this.accounts.filter(oAccount => parseInt(oAccount.updateInterval)
                && oAccount.login
                && oAccount.password
                && parseInt(oAccount.updateType)
                && parseInt(oAccount.actions)
            );

            /**
             * Обновить аккаунт
             * @param oAccount
             */
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
                let sUpdateType = window.ModelAccountFields.getValueById(oAccount.siteName, 'updateType', oAccount.updateType).code;
                if (sUpdateType === 'interval') {
                    let interval = setInterval(() => {
                        updateAccount(oAccount);
                    }, oAccount.updateInterval * 1000);
                    this.intervals.push(interval);
                    // Сразу запускаем обновление аккаунта, чтобы не ждать, когда сработает первый таймер
                    setTimeout(() => updateAccount(oAccount), 1000);
                } else if (sUpdateType === 'exactTime') {
                    let interval = setInterval(() => {
                        if ((self.curDate.getHours() * 3600 + self.curDate.getMinutes() * 60 + self.curDate.getSeconds()) === parseInt(oAccount.updateInterval)) {
                            updateAccount(oAccount);
                        }
                    }, 1000);
                    this.intervals.push(interval);
                }

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