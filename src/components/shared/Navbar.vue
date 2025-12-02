<script lang="ts">
import Row from './Row.vue';

export default {
    setup() {

    },
    mounted() {

    },
    data() {
        return {}
    },
    components: {
        Row,
    }

}


</script>

<template>
    <Row>
        <template #left>
            <p class="font-extrabold">TechCorp</p>
            <p>Dashboard</p>
            <p>Tools</p>
            <p>Analytics</p>
            <p>Settings</p>
        </template>
        <template #right>
            <p>Droite</p>
        </template>
    </Row>
</template>

<style scoped>
</style>