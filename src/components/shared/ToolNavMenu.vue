<script lang="ts">
import Popover from 'primevue/popover';
import { ref } from 'vue';
import NavLink from './NavLink.vue';
import { routes } from '../../router/index.ts';
import Tag from './Tag.vue';

export default {
    setup() {
        const popover = ref<InstanceType<typeof Popover> | null>(null);

        function toggle(event: MouseEvent) {
            if (window.innerWidth < 768) {
                popover.value?.toggle(event);
            }
        }

        function closeMenu() {
            popover.value?.hide();
        }

        return { 
            routes,
            popover, 
            toggle, 
            closeMenu
        };
    },
    components: { 
        Popover, 
        NavLink, 
        Tag 
    },
};
</script>

<template>
    <div>
        <Tag
            content="bolt"
            :isIcon="true"
            fromColor="from-blue-500"
            toColor="to-purple-700"
            :isRounded="true"
            @click="toggle"
        />

        <Popover ref="popover">
            <section class="flex flex-col gap-2 w-40">
                <NavLink
                    v-for="route in routes"
                    :key="route.name"
                    :to="route.path"
                    class="block px-4 py-2 hover:bg-gray-100 rounded"
                    @click="closeMenu"
                >
                    {{ route.name }}
                </NavLink>
            </section>
        </Popover>
    </div>
</template>
