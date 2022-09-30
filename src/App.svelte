<!-- Create an authentication popup window -->
<script>
    import Profile from './Profile.svelte';
    import Todos from './Todos.svelte';

    import { auth, googleProvider } from './firebase';
    import { authState } from 'rxfire/auth';

    let user;

    // Obtain user information from firebase
    const unsubscribe = authState(auth).subscribe(u => user = u);

    // Login popup window using Google Accounts
    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>


<section>

<!-- If user is signed in, generate the Todos svelte code and provide a logout button -->
{#if user}
    <Profile {...user} />
    <button on:click={ () => auth.signOut() }>Logout</button>
    <hr>
    <Todos uid={user.uid} />

<!-- If user is not signed in, add a button that allows them to sign in -->
{:else}
	<button on:click={login}>
		Signin with Google
	</button>
{/if}
</section>