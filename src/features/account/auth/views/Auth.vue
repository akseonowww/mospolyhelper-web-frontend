<template>
    <div class="outer">
        <div class="middle">
            <div class="container">
                <form @submit.prevent="logIn">
                    <input type="text" v-model="login" placeholder="Логин" />
                    <input type="password" v-model="password" placeholder="Пароль" />


                    
                    <div class="checkbox-element">
                        <input
                            class="checkbox"
                            type="checkbox"
                            name="savePassword"
                            id="savePassword"
                            v-model="savePassword"
                            />
                            <label for="savePassword">Сохранить пароль (небезопасно)</label>
                    </div>
                    <div class="checkbox-element">
                        <input class="checkbox" type="checkbox" name="saveLogin" id="saveLogin" v-model="saveLogin" />
                        <label for="saveLogin">Сохранить логин</label>
                    </div>
                    <input type="submit" value="Войти" v-if="!isLoading" />
                </form>
                <div v-if="success && !isLoading">Успешная авторизация</div>
                <div v-if="success == false && !isLoading">Неправильный логин или пароль</div>
                <loadingAnim :showing="isLoading" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
import AuthApi from "../../../../data/account/auth/api/authApi";
import AuthLocalDataSource from "../../../../data/account/auth/local/authLocalDataSource";
import AuthRemoteDataSource from "../../../../data/account/auth/remote/authRemoteDataSource";
import AuthRepositoryImpl from "../../../../data/account/auth/repository/authRepository";
import { StorageLocalDataSource } from "../../../../data/common/local/storageLocalDataSource";
import PreferencesRepository from "../../../../data/common/repository/preferencesRepository";
import AuthUseCase from "../../../../domain/account/auth/usecase/authUseCase";
import loadingAnim from "@/features/common/components/lodingAnimation.vue";
import App from "@/features/App.vue";

const useCase = new AuthUseCase(
    new AuthRepositoryImpl(new AuthLocalDataSource(), new AuthRemoteDataSource(new AuthApi())),
    new PreferencesRepository(new StorageLocalDataSource())
);

const auth = defineComponent({
    data() {
        return {
            login: "",
            password: "",
            success: null as boolean | null,
            saveLogin: false,
            savePassword: false,
            isLoading: false,
            emitter: getCurrentInstance()?.appContext.config.globalProperties.emitter,
        };
    },
    watch: {
        saveLogin(newValue: boolean, oldValue: boolean) {
            useCase.setPreference("SaveLogin", String(newValue));
        },
        savePassword(newValue: boolean, oldValue: boolean) {
            useCase.setPreference("SavePassword", String(newValue));
        },
    },
    mounted() {
        this.saveLogin = this.getSaveLogin();
        if (this.saveLogin) {
            this.login = useCase.getPreference("Login", "");
        }
        this.savePassword = this.getSavePassword();
        if (this.savePassword) {
            this.password = useCase.getPreference("Password", "");
        }
        if (this.$route.query["autoAuth"] == "1" && this.saveLogin && this.savePassword) {
            this.logIn();
        }
    },
    methods: {
        logIn() {
            console.log("trying to log in...");
            this.isLoading = true;
            if (this.saveLogin) {
                useCase.setPreference("Login", this.login);
            }
            if (this.savePassword) {
                useCase.setPreference("Password", this.password);
            }
            const res = useCase.logIn(this.login, this.password);
            res.then((it) => {
                this.success = it;
                this.isLoading = false;
                this.emitter.emit("updateHeader");
            });
        },
        getSaveLogin(): boolean {
            const saveLogin = useCase.getPreference("SaveLogin", "");
            if (saveLogin == "true") {
                return true;
            } else {
                return false;
            }
        },
        getSavePassword(): boolean {
            const savePassword = useCase.getPreference("SavePassword", "");
            if (savePassword == "true") {
                return true;
            } else {
                return false;
            }
        },
    },
    components: {
        loadingAnim,
    },
});

export default auth;
</script>

<style scoped>
* {
    box-sizing: border-box;
}
.outer {
    display: table;
    position: relative;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}

.middle {
    display: table-cell;
    vertical-align: middle;
}

/* style the container */
.container {
    max-width: 500px;
    width: 50%;
    position: relative;
    border-radius: 5px;
    padding: 20px 100px 30px 100px;
    margin-left: auto;
    margin-right: auto;
}

.container form {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 12px;
}

@media screen and (max-width: 600px) {
    .container {
        padding: 0;
        max-width: auto;
        min-width: 70vw;
    }
}

/* style inputs and link buttons */

input[type="text"], input[type="password"] {
    width: 100%;
}

input[type="submit"] {
    font-family: Rubik, sans-serif;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px 24px;
    background: #2e4054;
    border-radius: 12px;
    height: 44px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    border: 0px;
    cursor: pointer;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    width: 100%;
    display: block;
    word-wrap: break-word;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    gap: 8px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
</style>
