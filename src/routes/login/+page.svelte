<script lang="ts">
    import type { ActionData, PageData } from './$types';
    import{enhance} from '$app/forms';

    export let data
    export let form: ActionData

</script>
<html lang="se">

    <form method="post" action="?/login" use:enhance>


    <lable for="name">namn</lable>
    <input type="text" name="username">
    <lable for="password">password</lable>
    <input type="text" name="password">
    <button type="submit">login</button>


    {#if form?.username}
    <span style="color: red">{form.username}</span>
    {/if}
    {#if form?.password}
    <span style="color: red">{form.password}</span>
    {/if}
    </form>
</html>
<style>
    html{
        background-color: #524e4e;
        width: 100wh;
        height: 100vh;
        overflow: hidden

    }

</style>