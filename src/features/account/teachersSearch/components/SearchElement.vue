<template>
    <div class="card">
        <img :src="imageSrc" alt="Avatar"> <br />
        <div class="container">
            <div class="status" v-bind:class="[status=='Пользователь не на сайте' ? offline : online]"> </div>
            <div class="title"><b>{{name}}</b></div>
            <div v-if="info.length != 0">Информация: {{info}}</div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    const searchElement = defineComponent({
        props: {
            name: String,
            info: String,
            avatarUrl: String,
            status: String,
            dialogKey: String
        },
        methods: {
            
        },
        data() {
            return {
                online: 'online',
                offline: 'offline'
            }
        },
        computed: {
            imageSrc: function (): String {
                console.log("https://e.mospolytech.ru/old/" + this.avatarUrl);
                return `https://e.mospolytech.ru/old/${this.avatarUrl}`
            }
        }
    });

    export default searchElement;
</script>

<style scoped>
    .title {
        
    }

    .status {
        color: white;
        padding: 6px;
        border-radius: 100%;
        display: block;
        float: right;
        margin-bottom: 5px;
    }

    .online {
        background-color: #4CAF50cf;
    }
    /* Green */
    .offline {
        background-color: #f44336ea;
    }
    /* Red */

    .card {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        width: 230px;
        border-radius: 10px;
        display: inline-block;
        margin-top: 10px;
        margin-bottom: 3px;
        margin-left: 10px;
        margin-right: 10px;
        opacity: 1;
        vertical-align: top;
    }

        .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
            opacity: 0.6;
        }

    img {
        border-radius: 10px 10px 0 0;
        width: 230px;
        height: 230px;
    }

    .container {
        padding: 5px;
        margin-bottom: 5px;
        min-height: 70px;
    }
    
</style>