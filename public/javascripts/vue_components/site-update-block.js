Vue.component('site-update-block', {
    props:    {
        /** Название сайта */
        siteName: {
            type: String,
            required: true,
        },
        /** Массив аккаунтов */
        propAccounts: {
            type: Array,
            required: false,
            default: []
        },
        /** Массив полей аккаунта */
        propAccountFields: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            accounts: this.propAccounts
        }
    },
    methods:  {
        /** Запустить тест обновления сайта с  запуском браузера и т.п. */
        testUpdate: function () {
            this.accounts.forEach(account => {
                let oData = [
                    {name: 'debug', value: true},
                    {name: 'site', value: this.siteName},
                    {name: 'accountId', value:account.id},
                ];
                $.ajax({
                    url:     '/ajax',// URL, куда отправлять запрос
                    data:    oData,
                    timeout: 1000 * 60* 60, // Время ожидания ответа от сервера
                    //type:     'POST',
                    success: response => console.log(response),
                    error:   error => console.log(error)
                });
            });

        },
        /** Добавить новый аккаунт */
        addAccount: function () {
            let newAccount = {};
            for (let fieldName in this.propAccountFields) {
                if (this.propAccountFields.hasOwnProperty(fieldName)) {
                    switch (this.propAccountFields[fieldName].jsType) {
                        case Array:
                            newAccount[fieldName] = [];
                            break;
                        case Number:
                            newAccount[fieldName] = 0;
                            break;
                        default:
                            newAccount[fieldName] = '';
                    }
                }
            }
            newAccount.siteName = this.siteName;
            newAccount = window.ModelUserData.addAccount(newAccount);
            if (newAccount && Number.isInteger(newAccount.id)) {
                this.accounts.push(newAccount);
            } else {
                throw new Error('При добавлении аккаунта произошла ошибка')
            }
        },
        /**
         * Удалить аккаунт
         * @param {Number | String} id ID Удаляемого аккаунта
         */
        deleteAccount: function(id) {
            id = parseInt(id);
            if (!Number.isInteger(id)) {
                throw new Error('Невозможно удалить аккаунт с ID ' + id );
            }
            let account = this.accounts.filter(account => account.id === id)[0];
            if (account) {
                let sConfirmMessage = 'Вы действительно хотите удалить аккаунт ' + account.login + ' сайта ' +  this.siteName + ' ?';
                if (confirm(sConfirmMessage) && window.ModelUserData.deleteAccount(id)) {
                    this.accounts.splice(this.accounts.indexOf(account), 1);
                }
            }

        },
        /**
         * Обновить аккаунт
         * @param {Number | String} id ID аккаунта
         * @param {Object} oNewValues Объект с обновляемыми свойтсвами
         */
        updateAccount: function (id, oNewValues) {
            id = parseInt(id);
            if (!Number.isInteger(id)) {
                throw new Error('Невозможно удалить аккаунт с ID ' + id );
            }

            if (window.ModelUserData.updateAccount(id, oNewValues)) {
                let account = this.accounts.filter(account => account.id === id)[0];
                this.accounts[this.accounts.indexOf(account)] = oNewValues;
            }
        }
    },
    template: `
<div  class="col-12 mb-4">
    <div class="card border-info">
            <div  class="card-header">
                {{siteName}}
            </div>
            <div class="card-body">
                    <div class="input-group mb-3" v-for="(account, index) in accounts" :key="index">
                        <template  v-for="(field, fieldName, index) in propAccountFields">
                            <select 
                                class="form-control"
                                v-if="field.type === 'list'"
                                :name="fieldName"
                                :title="field.name"
                                :multiple="field.multiple"
                                :size="field.multiple ? field.size ? field.size : 5 : 1"
                                v-model="account[fieldName]"
                                @change="updateAccount(account.id, account)"
                               >
                                <option
                                 v-for="option in field.value"
                                :value="option.id"
                                >{{option.name}}</option>
                            </select>
                            
                            <input v-else
                                class="form-control"
                                v-model.lazy="account[fieldName]"
                                :name="fieldName"
                                :type="field.type"
                                :placeholder="field.name"
                                :title="field.name"
                                @change="updateAccount(account.id, account)"
                                >
                            </template>
                            <div  class="input-group-append">
                                <button type="button" class="btn btn-outline-danger" @click="deleteAccount(account.id)">Удалить</button>
                            </div>
                        </div>
                        <button type="button" class="btn btn-outline-info" @click="addAccount">Добавить аккаунт</button>
                        <button type="button" class="btn btn-outline-secondary" @click="testUpdate">Протестировать</button>
                    </div>
            </div>
        </div>
</div>
        
    `
});