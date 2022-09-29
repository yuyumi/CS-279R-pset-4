<script>
    import TodoItem from './TodoItem.svelte';
    import { db } from './firebase';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';

    // User ID passed from parent
    export let uid;

    // Form Text
    let text;

    // Query requires an index, see screenshot below
    const query = db.collection('todos').where('uid', '==', uid).orderBy('created');

    const todos = collectionData(query, {idField: 'id'}).pipe(startWith([]));

    function add() {
        if (text !== '') {
            db.collection('todos').add({ uid, text, complete: false, created: Date.now() });
        }
        text = '';
    }

    function isEnter(event) {
        if (event.key === "Enter") {
            add()
        }
    }

    function updateStatus(event) {
        const { id, newStatus } = event.detail;
        db.collection('todos').doc(id).update({ complete: newStatus });
    }

    function removeItem(event) {
        const { id } = event.detail;
        db.collection('todos').doc(id).delete();
    }
</script>

<style>
    input { display: block }
</style>

<ul>
	{#each $todos as todo}

        <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />
        
	{/each}
</ul>


<input type="text" placeholder="Add a task" bind:value={text}>

<svelte:window on:keydown={isEnter} />

<button on:click={add}>Add Task</button>