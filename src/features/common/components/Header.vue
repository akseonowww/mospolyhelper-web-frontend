<template>
    <div class="navbar-outer" id="navbar-outer">
        <div class="navbar">
            <div class="logo">
                <img src="favicon.ico" alt="Logo" />
                <div class="logoText">
                    <h1>mospolyhelper</h1>
                </div>
            </div>
            <div class="navbar-links scrollApp">
                <HeaderLink to="/" exact>Главная</HeaderLink>
                <HeaderLink to="/schedule">Расписание</HeaderLink>
                <HeaderLink to="/locations">Карта</HeaderLink>
                <HeaderLink to="/search">Поиск студентов</HeaderLink>
            </div>
            <div class="navbar-group">
                <div class="dropdown">
                    <button class="dropbtn">Аккаунт</button>
                    <div class="dropdown-content">
                        <HeaderLink to="/account/auth">Авторизация</HeaderLink>
                        <HeaderLink v-show="info" to="/account/info">Обо мне</HeaderLink>
                        <HeaderLink v-show="myportfolio" to="/account/deadlines">Дедлайны</HeaderLink>
                        <HeaderLink v-show="applications" to="/account/applications">Справки</HeaderLink>
                        <HeaderLink v-show="teachers" to="/account/teachersSearch">Поиск преподавателей</HeaderLink>
                        <HeaderLink v-show="classmates" to="/account/classmates">Одногруппники</HeaderLink>
                        <HeaderLink v-show="marks" to="/account/marks">Оценки</HeaderLink>
                        <HeaderLink v-show="messages" to="/account/dialogs">Сообщения</HeaderLink>
                    </div>
                </div>
                <loadingAnim class="loading" :showing="isLoading" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
import HeaderLink from "./HeaderLink.vue";
import AuthApi from "@/data/account/auth/api/authApi";
import AuthLocalDataSource from "@/data/account/auth/local/authLocalDataSource";
import AuthRemoteDataSource from "@/data/account/auth/remote/authRemoteDataSource";
import AuthRepositoryImpl from "@/data/account/auth/repository/authRepository";
import { StorageLocalDataSource } from "@/data/common/local/storageLocalDataSource";
import PreferencesRepository from "@/data/common/repository/preferencesRepository";
import AuthUseCase from "@/domain/account/auth/usecase/authUseCase";
import loadingAnim from "@/features/common/components/lodingAnimation.vue";
import router from "../router/router";

const useCase = new AuthUseCase(
    new AuthRepositoryImpl(new AuthLocalDataSource(), new AuthRemoteDataSource(new AuthApi())),
    new PreferencesRepository(new StorageLocalDataSource())
);

const Header = defineComponent({
    props: {
        permission: Array,
    },
    data() {
        return {
            isLoading: false,
            dialogs: false,
            info: false,
            marks: false,
            classmates: false,
            teachers: false,
            applications: false,
            myportfolio: false,
            portfolios: false,
            messages: false,
            emitter: getCurrentInstance()?.appContext.config.globalProperties.emitter,
        };
    },
    components: {
        HeaderLink,
        loadingAnim,
    },
    mounted() {
        this.show();
        this.emitter.on("updateHeader", () => {
            this.show();
        });
    },
    methods: {
        show() {
            this.isLoading = true;
            this.dialogs = false;
            this.info = false;
            this.marks = false;
            this.classmates = false;
            this.teachers = false;
            this.applications = false;
            this.myportfolio = false;
            this.portfolios = false;
            this.messages = false;
            let self = this;
            useCase.getPermissions().then((result) => {
                if (result.isSuccess) {
                    console.log(result.value);
                    (result.value as Array<string>).forEach((val) => {
                        switch (val) {
                            case "dialogs":
                                self.dialogs = true;
                                break;
                            case "info":
                                self.info = true;
                                break;
                            case "marks":
                                self.marks = true;
                                break;
                            case "classmates":
                                self.classmates = true;
                                break;
                            case "applications":
                                self.applications = true;
                                break;
                            case "myportfolio":
                                self.myportfolio = true;
                                break;
                            case "portfolios":
                                self.portfolios = true;
                                break;
                            case "teachers":
                                self.teachers = true;
                                break;
                            case "messagges":
                                self.messages = true;
                                break;
                        }
                        this.messages = true;
                    });
                } else if (result.isFailure) {
                    if (result.errorOrNull()?.message == "401") {
                        alert("Вы будете перенаправлены на страницу авторизации.");
                        router.push("/account/auth");
                    }
                }
                this.isLoading = false;
            });
        },
    },
    computed: {
        premissions: function (): string {
            let self = this;
            this.permission?.forEach((val) => {
                switch (val) {
                    case "dialogs":
                        self.dialogs = true;
                        break;
                    case "info":
                        self.info = true;
                        break;
                    case "marks":
                        self.marks = true;
                        break;
                    case "classmates":
                        self.classmates = true;
                        break;
                    case "applications":
                        self.applications = true;
                        break;
                    case "myportfolio":
                        self.myportfolio = true;
                        break;
                    case "portfolios":
                        self.portfolios = true;
                        break;
                }
            });
            return "";
        },
    },
});

export default Header;
</script>

<style scoped>
.navbar-outer {
    background-color: rgba(255, 255, 255, 0.801);
    position: relative;
    backdrop-filter: blur(4px);
    height: 60px;
}
@media screen and (max-width: 600px) {
    .navbar-outer {
        height: auto;
    }
}
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    overflow: hidden;
    gap: 12px;
    padding: 0 2em;
}
@media screen and (max-width: 600px) {
    .navbar {
        flex-direction: column;
        height: auto;
        padding: 2em 0;
        align-items: flex-start;
    }
}
.navbar-links {
    display: flex;
    justify-content: center;
    width: 100%;
}
@media screen and (max-width: 600px) {
    .navbar-links {
        width: 100%;
        gap: 1em;
        justify-content: flex-start;
        overflow-x: scroll;
        /* padding-left: 2em; */
    }
}
/* The dropdown container */
@media screen and (max-width: 600px) {
    .navbar-group {
        position: absolute;
        top: 32px;
        right: 0;
        padding-right: 32px;
    }
}
.dropdown {
    overflow: hidden;
    justify-self: end;
}

.dropdown:hover {
    cursor: pointer;
}

/* Dropdown button */
.dropdown .dropbtn {
    font-size: 16px;
    border: none;
    border-radius: 100px;
    outline: none;
    color: #fff;
    padding: 8px 16px;
    background-color: #2e4054;
    font-family: inherit; /* Important for vertical align on mobile phones */
    margin: 0; /* Important for vertical align on mobile phones */
}

/* Dropdown content (hidden by default) */
.dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    background-color: #fff;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    z-index: 1;
    overflow: hidden;
    box-shadow: 0px 0px 32px 4px rgb(186 186 186 / 30%);
}
/* Links inside the dropdown */
.dropdown-content div {
    float: none;
    color: black;
    padding: 8px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
    border-radius: 0;
}
@media screen and (max-width: 600px) {
    .dropdown-content {
        justify-content: start;
        min-width: 100vw;
        right: 0;
    }
    .dropdown-content div {
        width: 100%;
        padding: 12px;
    }
    .dropdown-content div .nav-link-center {
        padding: 0;
        margin: 0;
        width: 100%;
    }
}
/* Add a grey background color to dropdown links on hover */
.dropdown-content div:hover {
    background-color: #2e405436;
}
/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
    display: block;
}
/* Add a background color to navbar links on hover */
.navbar .dropdown:hover .dropbtn {
    cursor: pointer;
}

#navbar-outer {
    z-index: 2;
    position: fixed; /* Set the navbar to fixed position */
    top: 0; /* Position the navbar at the top of the page */
    width: 100%; /* Full width */
}

@media screen and (max-width: 600px) {
    #navbar-outer {
        position: relative;
    }
}

.loading-container {
    display: (isLoading ? block: none);
    background: #fff;
    position: absolute;
    top: 22px;
    left: 50%;
    margin-left: -50px;
    height: 100px;
    width: 100px;
    padding: 16px;
    border-radius: 16px;
    box-shadow: 0px 0px 32px 4px rgb(186 186 186 / 30%);
}

.logo-link {
    display: flex;
    justify-content: center;
    align-items: center;
}
.logo {
    display: flex;
    align-items: center;
    gap: 8px;
}
@media screen and (max-width: 600px) {
    .logo {
        padding-left: 2em;
    }
}
.logo img {
    height: 32px;
    height: 32px;
}
.logoText h1 {
    font-family: Gilroy;
    font-size: 20px;
    padding: 0;
    margin: 0;
}
</style>
