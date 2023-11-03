<script lang="ts">
	import { onMount } from "svelte";
    import supabase from "../supabase";

    let projects: {
        id: string;
        created_at: string;
        owner_id: string;
        name: string;
    }[] = [];

    onMount(async () => {
        const { data, error } = await supabase
            .from('projects')
            .select('*');

        if (error) {
            console.log(error);
        } else {
            projects = data;
        }
    });
</script>

{#if projects}
    <div class="w-full h-full p-20">
        {#each projects as project}
            <a class="block card card-hover p-4 bg-zinc-700 text-white" href="/{project.id}">{project.name}</a>
        {/each}
    </div>
{/if}
