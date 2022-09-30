<script>

    import { createEventDispatcher } from 'svelte';

    // Event dispatcher
    const dispatch = createEventDispatcher();
    
    // Dispatch to the remove function passing in todo id as the input
    function remove() {
		dispatch('remove', { id });
	}

    // Dispatch to the updatestatus function with todo id and the updated completion status as the input
	function toggleStatus() {

        // Switch the completion status of a todo
        let newStatus = !complete;

		dispatch('toggle', {
            id,
            newStatus
        });
    }
    

    export let id; // document ID
    export let text;
    export let complete;
</script>

<!-- Strike-through the todo text when marked complete -->
<style>
    .is-complete {
        text-decoration: line-through;
        color: green;
    }
</style>

<!-- Buttons for the todo items to toggle completion status and remove todo -->
<li>

<!-- Button for toggling completion status -->
{#if complete}
    <span class="is-complete">{ text }</span>
    <button on:click={toggleStatus}> ✔️ </button>
{:else}
    <span>{ text }</span>
    <button on:click={toggleStatus}> ❌ </button>
{/if}

<!-- Button to remove a todo -->
<button on:click={remove}> 🗑 </button>

</li>