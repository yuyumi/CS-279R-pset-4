<script>
    export let displayName;
    export let photoURL;
    export let uid;
</script>

<!-- Display username -->
<h3>Hi { displayName }!</h3>

<!-- Display user profile picture and user id -->
<img src={ photoURL } width="100" alt="user avatar">
<p>Your userID is { uid }</p>