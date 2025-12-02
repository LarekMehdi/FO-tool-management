<script lang="ts">
import type { ToolSearchFilter } from '../../interfaces/filter.interface';
import InputText from '../inputs/InputText.vue';
import NavLink from './NavLink.vue';
import Row from './Row.vue';
import Tag from './Tag.vue';

export default {
    setup() {

    },
    mounted() {

    },
    data(): {
        filter: ToolSearchFilter,
    }
    {
        return {
            filter: {
                query: '',
            }
        }
    },
    components: {
        Row,
        InputText,
        NavLink,
        Tag,
    }

}


</script>

<template>
    <Row class="h-16 px-10">

        <template #left>
            <div class="flex items-center gap-6">
                <Tag
                    content="bolt"
                    :isIcon="true"
                    fromColor="from-blue-500"
                    toColor="to-purple-700"
                    :isRounded="true"
                />
                <p class="font-bold">TechCorp</p>
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/#">Tools</NavLink>
                <NavLink to="/#">Analytics</NavLink>
                <NavLink to="/#">Settings</NavLink>
            </div>
            
        </template>

        <template #right>
            <!-- TODO: mettre un autocomplete -->
            <InputText
                v-model="filter.query"
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