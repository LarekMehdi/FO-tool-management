<script lang="ts">
import Popover from 'primevue/popover';
import { ref } from 'vue';

    export default {
        props: {
            modelValue: {
                type: Number,
                required: true,
            },
            firstLabel: {
                type: String,
                required: false,
                default: 'Details',
            },
            secondLabel: {
                type: String,
                required: false,
                default: 'Edit',
            },
            thirdLabel: {
                type: String,
                required: false,
                default: 'Delete',
            },
        }, 
        setup() {
            const popover = ref<InstanceType<typeof Popover> | null>(null);

            function toggle(event: MouseEvent) {
                popover.value?.toggle(event);
            }

            return { 
                popover, 
                toggle 
            };
        },
        emits: ["details", "edit", "delete"],
        components: {
            Popover,
        }
    }
</script>

<template>

    <i @click="toggle" class="pi pi-chevron-down cursor-pointer"></i>

    <Popover ref="popover">
        <section class="flex flex-col gap-4 w-40">
            <ul class="list-none p-0 m-0 flex flex-col">
                <li class="px-2 py-1 hover:bg-blue-100 cursor-pointer rounded" @click="$emit('details', modelValue)">
                    {{ firstLabel }}
                </li>
                <li class="px-2 py-1 hover:bg-green-100 cursor-pointer rounded" @click="$emit('edit', modelValue)">
                    {{ secondLabel }}
                </li>
                <li class="px-2 py-1 hover:bg-red-100 cursor-pointer rounded" @click="$emit('delete', modelValue)">
                    {{ thirdLabel }}
                </li>
            </ul>
        </section>
    </Popover>
</template>

