<script lang="ts">
	import { onMount } from "svelte";
    import supabase from "../../supabase";
	import { page } from "$app/stores";

    let project: {
        id: string;
        created_at: string;
        owner_id: string;
        name: string;
    } = {
		id: "",
		created_at: "",
		owner_id: "",
		name: ""
	};
    let transactions: {
        id: string;
        created_at: string;
        amount: number;
        amount_ratio: number;
        buyer_id: string;
    }[] = [];

    onMount(async () => {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', $page.params.uid);

        if (error) {
            console.log(error);
        } else {
            project = data[0];
        }

        const { data: transactionsData, error: transactionsError } = await supabase
            .from('transactions')
            .select('*')
            .eq('project_id', $page.params.uid);
    });
</script>

{#if project}
    <div class="w-full h-full p-20">
        <h1 class="h1">
            {project.name}
        </h1>
    </div>
{/if}
