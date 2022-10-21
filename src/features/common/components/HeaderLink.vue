<template>
    <div class="nav-link-div" click="propogate">
        <div class="nav-link-center">
            <router-link :to="to" class="nav-link">
                <slot />
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";
type HeaderLinkProps = {
    to: string;
    exact: boolean;
};
const HeaderLink = defineComponent({
    props: {
        to: { type: String, required: true },
        exact: { type: Boolean, default: false },
    },
    setup(props: HeaderLinkProps) {
        const route = useRoute();
        const active = computed(() => (props.exact ? route.path === props.to : route.path.startsWith(props.to)));
        return { active };
    },
});
export default HeaderLink;
</script>

<style scoped>
.nav-link-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
@media screen and (max-width: 950px) {
    .navbar-links {
        justify-content: center;
        gap: 0;
    }
}
.nav-link {
    font-size: 16px;
    text-decoration: none;
    color: #000;
}
@media screen and (max-width: 600px) {
    .nav-link {
        width: max-content;
    }

    .nav-link-div:nth-child(1) {
        padding-left: 2em;
    }

    .nav-link-div:nth-child(4) {
        padding-right: 2em;
    }
}

.nav-link:hover {
    color: #2e4054;
}
.nav-link-div {
    padding: 12px;
    text-align: center;
    border-radius: 12px;
}
@media screen and (max-width: 600px) {
    .nav-link-div {
        /* padding: 0; */
        width: max-content;
    }
}
.nav-link-div:hover {
    background-color: rgba(46, 64, 84, 0.05);
    cursor: pointer;
}
</style>
