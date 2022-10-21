<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <div class="schedule">
        <div class="schedule-container">
            <div class="search-conteiner">
                <form class="search" click="download">
                    <input v-model="group" type="text" placeholder="Номер группы" />
                    <button class="searchBtn" @click="download"><i class="fa fa-search"> </i> Найти</button>
                    <!-- <button @click="advancedInit" class="searchBtn smartSearchBtn">Продвинутый поиск</button> -->
                </form>
                <div class="filters-container">
                    <span> Фильтр по датам: </span>
                    <div class="filters">
                        <div class="filters-item">
                            <input class="checkbox" type="checkbox" v-model="showEnded" id="showEnded" />
                            <label for="showEnded"> Закончившиеся </label>
                        </div>
                        <div class="filters-item">
                            <input class="checkbox" type="checkbox" v-model="showCurrent" id="showCurrent" />
                            <label for="showCurrent"> Текущие </label>
                        </div>
                        <div class="filters-item">
                            <input class="checkbox" type="checkbox" v-model="showNotStarted" id="showNotStarted" />
                            <label for="showNotStarted"> Неначавшиеся </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="datesOuter">
                <div class="dates">
                    <a class="prev" @click="setPreviousWeek">
                        <i class="fa fa-angle-left"></i>
                    </a>
                    <div class="dateText">
                        <small> Неделя </small>
                        <div>{{ getFormattedDate(dates[0]) }} - {{ getFormattedDate(dates[6]) }}</div>
                    </div>
                    <a class="next" @click="setNextWeek">
                        <i class="fa fa-angle-right"></i>
                    </a>
                </div>
            </div>
        </div>

        <weeklySchedule :dailySchedules="dailySchedules" :dates="dates"></weeklySchedule>
        <loadingAnim :showing="isLoading" />
        <br />
        <br />
        <br />
        <div v-show="advancedSearchVisible">
            <p class="advancedSearchTitle">Продвинутый поиск</p>
            <loadingAnim :showing="loadingAdvanced" />
            <arraySelector v-if="groupList?.length" :originalArray="groupList" @arrayChanged="groupListChanged" />
            <arraySelector v-if="teacherList?.length" :originalArray="teacherList" @arrayChanged="teacherListChanged" />
            <arraySelector
                v-if="auditoriumList?.length"
                :originalArray="auditoriumList"
                @arrayChanged="auditoriumListChanged"
            />
            <arraySelector v-if="titleList?.length" :originalArray="titleList" @arrayChanged="titleListChanged" />
            <arraySelector v-if="typeList?.length" :originalArray="typeList" @arrayChanged="typeListChanged" />
            <button
                v-if="
                    groupList?.length ||
                    teacherList?.length ||
                    auditoriumList?.length ||
                    titleList?.length ||
                    typeList?.length
                "
                class="searchBtn"
                @click="advancedSearch"
            >
                <i class="fa fa-search"></i>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Lesson from "@/domain/schedule/model/lesson";
import weeklySchedule from "@/features/schedule/components/WeeklySchedule.vue";
import arraySelector from "@/features/schedule/components/ArraySelector.vue";
import ScheduleUseCase from "@/domain/schedule/usecase/scheduleUseCase";
import Schedule from "@/domain/schedule/model/schedule";
import { getLessons } from "@/domain/schedule/utils/scheduleUtils";
import * as moment from "moment";
import "moment/locale/ru";
import loadingAnim from "@/features/common/components/lodingAnimation.vue";

moment.locale("ru");

const useCase = new ScheduleUseCase();

const schedule = defineComponent({
    props: {},
    data() {
        return {
            dailySchedules: [new Array<Lesson>(), [], [], [], [], [], []],
            group: "",
            showEnded: false,
            showCurrent: true,
            showNotStarted: false,
            dates: [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
            schedule: null as Schedule | null,
            groupList: new Array<string>(),
            teacherList: new Array<string>(),
            auditoriumList: new Array<string>(),
            titleList: new Array<string>(),
            typeList: new Array<string>(),
            checkedGroupList: new Array<string>(),
            checkedTeacherList: new Array<string>(),
            checkedAuditoriumList: new Array<string>(),
            checkedTitleList: new Array<string>(),
            checkedTypeList: new Array<string>(),
            isLoading: false,
            advancedSearchVisible: false,
        };
    },
    watch: {
        showEnded(newValue, oldValue) {
            this.update();
        },
        showCurrent(newValue, oldValue) {
            this.update();
        },
        showNotStarted(newValue, oldValue) {
            this.update();
        },
        schedule(newValue, oldValue) {
            this.update();
        },
    },
    components: {
        weeklySchedule,
        arraySelector,
        loadingAnim,
    },
    methods: {
        getFormattedDate(date: Date) {
            const moment = require("moment");
            return moment(date).format("D MMMM");
        },
        download() {
            this.isLoading = true;
            useCase.getScheduleByGroup(this.group).then((value) => {
                this.schedule = value;
                this.isLoading = false;
            });
        },
        advancedInit() {
            this.$data.advancedSearchVisible = !this.$data.advancedSearchVisible;
            if (this.groupList.length == 0) {
                useCase.getGroupList().then((value) => {
                    this.groupList = value;
                });
            }
            if (this.teacherList.length == 0) {
                useCase.getTeacherList().then((value) => {
                    this.teacherList = value;
                });
            }
            if (this.auditoriumList.length == 0) {
                useCase.getAuditoriumList().then((value) => {
                    this.auditoriumList = value;
                });
            }
            if (this.titleList.length == 0) {
                useCase.getTitleList().then((value) => {
                    this.titleList = value;
                });
            }
            if (this.typeList.length == 0) {
                useCase.getTypeList().then((value) => {
                    this.typeList = value;
                });
            }
        },
        advancedSearch() {
            useCase
                .getSchedule(
                    this.checkedGroupList,
                    this.checkedTeacherList,
                    this.checkedAuditoriumList,
                    this.checkedTitleList,
                    this.checkedTypeList
                )
                .then((value) => {
                    this.schedule = value;
                });
        },
        update() {
            let dailySchedules = new Array<Array<Lesson>>();
            for (let i = 0; i < 7; i++) {
                dailySchedules[i] = this.schedule
                    ? getLessons(this.schedule, this.dates[i], this.showEnded, this.showCurrent, this.showNotStarted)
                    : [];
            }
            this.dailySchedules = dailySchedules;
        },
        setCurrentWeek() {
            let today = new Date();
            let dayOfWeek = today.getDay();
            if (dayOfWeek == 0) {
                dayOfWeek = 7;
            }
            const monday = 1;
            today.setDate(today.getDate() - (dayOfWeek - monday));
            let dates = new Array<Date>();
            for (let i = 0; i < 7; i++) {
                dates[i] = new Date(today);
                today.setDate(today.getDate() + 1);
            }
            this.dates = dates;
        },
        setNextWeek() {
            for (const date of this.dates) {
                date.setDate(date.getDate() + 7);
            }
            this.update();
        },
        setPreviousWeek() {
            for (const date of this.dates) {
                date.setDate(date.getDate() - 7);
            }
            this.update();
        },
        groupListChanged(value: Array<string>) {
            this.checkedGroupList = value;
        },
        teacherListChanged(value: Array<string>) {
            this.checkedTeacherList = value;
        },
        auditoriumListChanged(value: Array<string>) {
            this.checkedAuditoriumList = value;
        },
        titleListChanged(value: Array<string>) {
            this.checkedTitleList = value;
        },
        typeListChanged(value: Array<string>) {
            this.checkedTypeList = value;
        },
    },
    created() {
        this.setCurrentWeek();
    },
    computed: {
        loadingAdvanced: function (): boolean {
            return (
                this.groupList.length == 0 ||
                this.teacherList.length == 0 ||
                this.auditoriumList.length == 0 ||
                this.titleList.length == 0 ||
                this.typeList.length == 0
            );
        },
    },
});

export default schedule;
</script>

<style scoped>
.schedule-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    padding: 0 2em;
}

@media screen and (max-width: 1100px) {
    .schedule-container {
        flex-direction: column;
        gap: 24px;
        margin-bottom: 12px;
    }
}

@media screen and (max-width: 600px) {
    .schedule-container {
        /* transform: scale(0.7); */
    }
}

input[type="text"] {
    box-sizing: border-box;
    padding: 12px;
    font-size: 20px;
    border: 2px solid #b8c1cc;
    border-radius: 12px;
    width: 200px;
    height: 44px;
    /* background: #f2f3f5; */
    outline: none;
}

.searchBtn {
    font-family: Rubik, sans-serif;
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
    transition: all 0.5s;
    width: auto;
    display: block;
    word-wrap: break-word;
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
}
.searchBtn:hover {
    box-shadow: 0px 0px 32px 4px rgb(186 186 186 / 30%);
}
.search-conteiner {
    display: flex;
    flex-direction: column;
    align-items: space-between;
    gap: 12px;
}
.search {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    gap: 6px;
}
@media screen and (max-width: 1100px) {
    .search {
        justify-content: center;
    }
}
.filters-container {
    display: flex;
    align-items: center;
    gap: 8px;
}
@media screen and (max-width: 600px) {
    .filters-container {
        flex-direction: column;
    }

    .filters-container span {
        display: none;
    }
}
.filters {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
}
@media screen and (max-width: 600px) {
    .filters {
        flex-wrap: wrap;
        gap: 10px 16px;
    }
}
.filters-item {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.5s;
}
.filters-item input[checked] {
    background: #2e4054;
    color: #ffffff;
}
.checkbox {
    position: absolute;
    z-index: -1;
    opacity: 0;
    transition: all 0.5s;
    margin-bottom: 32px;
}
.checkbox + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
}
.checkbox + label::before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 2px solid #b8c1cc;
    border-radius: 8px;
    margin-right: 0.5em;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
    transition: all 0.5s;
}

.checkbox:checked + label::before {
    border-color: #2e4054;
    background-color: #2e4054;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
    transition: all 0.5s;
}
.checkbox:not(:disabled):not(:checked) + label:hover::before {
    border-color: #2e4054;
    transition: all 0.5s;
}
.checkbox:not(:disabled):active + label::before {
    background-color: #2e405409;
    border-color: #2e405409;
    transition: all 0.5s;
}
.checkbox:focus + label::before {
    box-shadow: 0 0 0 0.2rem #2e405411;
    transition: all 0.3s;
}
.checkbox:focus:not(:checked) + label::before {
    border-color: #2e405457;
    transition: all 0.3s;
}
.checkbox:disabled + label::before {
    background-color: #b8c1cc;
    transition: all 0.3s;
}
.datesOuter {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
@media screen and (max-width: 600px) {
    .datesOuter {
        padding: 0 1em;
    }
}
.dates {
    height: 44px;
    padding: 1px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    gap: 12px;
}
.dates > * {
    box-sizing: border-box;
}
.dateText {
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 260px;
    background-color: #fff;
}
@media screen and (max-width: 600px) {
    .dateText {
        /* width: 100%; */
    }
}
/* Next & previous buttons */
.prev,
.next {
    cursor: pointer;
    width: auto;
    padding: 14px;
    color: rgba(0, 0, 0, 0.356);
    font-weight: 300;
    font-size: 32px;
    transition: 0.6s ease;
    user-select: none;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    height: 64px;
    width: 48px;
    background-color: #f2f3f5;
    overflow: hidden;
    box-sizing: border-box;
}
/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {
    .prev,
    .next,
    .text {
        font-size: 11px;
    }
}

.advancedSearchTitle {
    font-size: 30px;
}
</style>
