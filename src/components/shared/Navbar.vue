<script lang="ts">
import InputText from '../inputs/InputText.vue';
import Row from './Row.vue';

export default {
    setup() {

    },
    mounted() {

    },
    data(): {
        item: any,
    }
    {
        return {
            item: {}
        }
    },
    components: {
        Row,
        InputText,
    }

}


</script>

<template>
    <Row class="h-16 px-6">
        
        <template #left>
            <div class="flex items-center gap-6">
                <i class="pi pi-bolt"></i>
                <p class="font-bold">TechCorp</p>
                <p>Dashboard</p>
                <p class="text-gray-500">Tools</p>
                <p class="text-gray-500">Analytics</p>
                <p class="text-gray-500">Settings</p>
            </div>
            
        </template>

        <template #right>
            <!-- TODO: mettre un autocomplete -->
            <InputText
                v-model="item.query"
                name="itemQuery"
                label="query"
                :inline="true"
                :displayLabel="false"
                placeholder="Search tools..."
            />
            <div class="flex items-center gap-6 text-gray-500">
                <i class="pi pi-moon"></i>
                <i class="pi pi-bell"></i>
                <i class="pi pi-cog"></i>
            </div>
        </template>
    </Row>

    <hr class="w-full border-t border-gray-300 mt-0" />
</template>

<style scoped>
</style>