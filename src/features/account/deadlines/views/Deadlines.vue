<template>
    <br />
    <label class="container">
        (dev) сохранять изменения сразу
        <input type="checkbox" v-model="saveMode">
        <span class="checkmark"></span>
    </label>
    <deadlineList :deadlinesList="deadlineArr"
                  :isLoading="isLoading"
                  :isSaving="isSaving"
                  :isChanged="isChanged"
                  v-on:removeFromArray="deleteElement"
                  v-on:update="setUpdated"
                  v-on:setCompleted="setCompleted"
                  v-on:setPinned="setPinned"
                  v-on:save="upd()" />
    <formDeadline :d="dUpdate"
                  v-on:update="updateDeadline"
                  v-on:add="addDeadline"
                  v-if="!isLoading">
    </formDeadline>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Deadline from "@/domain/account/deadlines/model/deadline";
    import deadlineList from "@/features/account/deadlines/components/DeadlineList.vue";
    import formDeadline from "@/features/account/deadlines/components/FormDeadline.vue";
    import DeadlinesUseCase from "@/domain/account/deadlines/usecase/deadlinesUseCase";

    let useCase = new DeadlinesUseCase();

    const deadlines = defineComponent({
        data() {
            return {
                deadlineArr: Array<Deadline>(),
                dUpdate: new Deadline("",""),
                isLoading: false,
                isSaving: false,
                isChanged: false,
                processArray: Array<string>(),
                saveMode: true
            }
        },
        components: {
            deadlineList,
            formDeadline
        },
        methods: {
            upd() {
                this.isSaving = true;
                this.processArray.push("сохраняется");
                let d: Array<Deadline> = useCase.getLocalDeadlines();
                useCase.setDeadlines(d).then(result => {
                    if (result.isSuccess) {
                        console.log(result.value.otherInformation);
                        this.processArray.pop()
                        this.isSaving = this.processArray.length != 0
                    } else {
                        alert(result.errorOrNull());
                        this.isSaving = false
                    }
                })
                this.isChanged = false;
            },
            updateList() {
                let d: Array<Deadline> = useCase.getLocalDeadlines();
                this.deadlineArr = [];
                d.forEach(val => this.deadlineArr.push(Object.assign({}, val)));
                this.isChanged = true;
            },
            deleteElement(id: number) {
                useCase.deleteDeadline(id)
                this.updateList();
                if (this.saveMode) this.upd();
            },
            setCompleted(id: number) {
                useCase.setCompleted(id);
                this.updateList();
                if (this.saveMode) this.upd();
            },
            setPinned(id: number) {
                useCase.setPinned(id);
                this.updateList();
                if (this.saveMode) this.upd();
            },
            addDeadline(d: Deadline) {
                useCase.addDeadline(d);
                this.updateList();
                if (this.saveMode) this.upd();
            },
            setUpdated(id: number) {
                this.dUpdate = useCase.getDeadline(id)
            },
            updateDeadline(d: Deadline) {
                useCase.editDeadline(d);
                this.dUpdate = new Deadline("", "");
                this.updateList();
                if (this.saveMode) this.upd();
            }
        },
        created() {
            this.isLoading = true;
            useCase.getPortfolio().then(result => {
                if (result.isSuccess) {
                    console.log(result);
                    useCase.setLocalDeadlines(useCase.jsonToArray(result.value.otherInformation)).forEach(val => this.deadlineArr.push(Object.assign({}, val)));
                } else if (result.isFailure) {
                    alert(result.errorOrNull());
                }
                this.isLoading = false
            })
        }
    });

    export default deadlines;
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    .container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

        /* Hide the browser's default checkbox */
        .container input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }

    /* Create a custom checkbox */
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
    }

    /* On mouse-over, add a grey background color */
    .container:hover input ~ .checkmark {
        background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    .container input:checked ~ .checkmark {
        background-color: #2196F3;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .container input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .container .checkmark:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
</style>
