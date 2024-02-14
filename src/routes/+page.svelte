<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';

    export let data: PageData;
</script>
<html lang="se">

    <a href="/pixelarts" >Pixelarts</a>

    <h1>
        HOME
    </h1>


    <form method="post" action="/login?/logout" use:enhance>


        <button>LOGOUT</button>

    
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