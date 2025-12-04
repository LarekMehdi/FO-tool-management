<script lang="ts">
import type { ToolSearchFilter } from '../../interfaces/filter.interface';
import InputText from '../inputs/InputText.vue';
import Avatar from './Avatar.vue';
import NavLink from './NavLink.vue';
import Row from './Row.vue';
import Tag from './Tag.vue';
import ToolActionMenu from './ToolActionMenu.vue';

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
        Avatar,
        ToolActionMenu,
    }

}


</script>

<template>
    <Row class="h-16 px-3 sm:px-6 lg:px-10">

        <template #left>
            <div class="flex items-center gap-3 sm:gap-6">
                <Tag
                    content="bolt"
                    :isIcon="true"
                    fromColor="from-blue-500"
                    toColor="to-purple-700"
                    :isRounded="true"
                />
                <p class="font-bold text-sm sm:text-base">TechCorp</p>
                <div class="hidden md:flex items-center gap-6">
                    <NavLink to="/">Dashboard</NavLink>
                    <NavLink to="/tools">Tools</NavLink>
                    <NavLink to="/#">Analytics</NavLink>
                    <NavLink to="/#">Settings</NavLink>
                </div>
            </div>
            
        </template>

        <template #right>
            <div class="flex items-center gap-4">
                <!-- TODO: mettre un autocomplete -->
                <div class="hidden sm:block">
                    <InputText
                        v-model="filter.query"
                        name="itemQuery"
                        label="query"
                        :inline="true"
                        :displayLabel="false"
                        placeholder="Search tools..."
                    />
                </div>
                <i class="pi pi-moon cursor-pointer hidden sm:block text-gray-500" style="font-size: 20px;"></i>

                <div class="relative flex items-center cursor-pointer text-gray-500">
                    <i class="pi pi-bell" style="font-size: 20px;"></i>
                    <span
                        v-if="true"
                        class="absolute"
                        style="
                            top: -13px;
                            right: -10px;
                            width: 15px;
                            height: 15px;
                            background-color: red;
                            border: 2px solid white;
                            border-radius: 50%;
                            display: inline-block;
                        "
                    ></span>
                </div>

                <i class="pi pi-cog cursor-pointer hidden lg:block text-gray-500" style="font-size: 20px;"></i>
                <Avatar />
                <div class="hidden sm:block">
                    <ToolActionMenu
                        :modelValue="0"
                        firstLabel="Profil"
                        secondLabel="Settings"
                        thirdLabel="Deconnection"
                        @details="() => console.log('open profil')"
                        @edit="() => console.log('open settings')"
                        @delete="() => console.log('Deconnection')"
                    />
                </div>
            </div>
        </template>
    </Row>

    <hr class="w-full border-t border-gray-300 mt-0" />
</template>

<style scoped>
</style>