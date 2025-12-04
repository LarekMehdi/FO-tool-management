<script lang="ts">
import Icon from './Icon.vue';
import defaultAvatar from '../../assets/defaultAvatar.png';

    export default {
        props: {
            avatarUrl: {
                type: String,
                required: false,
            }
        },
        components: {
            Icon
        },
        setup() {
            return {
                defaultAvatar,
            }
        }
    }
</script>

<template>
    <section class="inline-flex items-center justify-center w-10 h-12">
        <Icon :iconUrl="avatarUrl || defaultAvatar" :size="30"/>
    </section>
</template>

<style scoped></style>