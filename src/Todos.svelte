<script>
    import TodoItem from './TodoItem.svelte';
    import { db } from './firebase';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';

    // User ID passed from parent
    export let uid;

    // Form Text
    let text;

    // Query the todos for a user id and order by created date
    const query = db.collection('todos').where('uid', '==', uid).orderBy('created');

    // Store the todos into a list
    const todos = collectionData(query, {idField: 'id'}).pipe(startWith([]));

    // Add a todo
    function add() {
        if (text !== '') {

            // Send the todo information to firestore
            db.collection('todos').add({ uid, text, complete: false, created: Date.now() });
        }

        // Reset the text input
        text = '';
    }

    // Add todo if enter key is pressed
    function isEnter(event) {
        if (event.key === "Enter") {
            add()
        }
    }

    // Update the completion status of a todo
    function updateStatus(event) {
        const { id, newStatus } = event.detail;

        // Update to firestore
        db.collection('todos').doc(id).update({ complete: newStatus });
    }

    // Remove a todo
    function removeItem(event) {
        const { id } = event.detail;

        // Remove from firestore
        db.collection('todos').doc(id).delete();
    }
</script>

<!-- Input box for todos -->
<style>
    input { display: block }
</style>

<!-- Show todos as a list -->
<ul>
	{#each $todos as todo}

        <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />
        
	{/each}
</ul>

<!-- Style the input box with placeholder text and bind the text value inside the input box to the text input for adding todos -->
<input type="text" placeholder="Add a task" bind:value={text}>

<!-- Check if enter key is pressed -->
<svelte:window on:keydown={isEnter} />

<!-- `Add` button that adds a todo on click -->
<button on:click={add}>Add Task</button>