<!-- page for creating new pixelart -->

<!-- we are using sveltekit form ac./arts/$typesns/$typesd loading data from a sveltekit server -->

<script lang="ts">
    import { enhance } from '$app/forms';


  export let data;
  $: artList = data.arts;
</script>

<!-- add a list of pixelart which lists data.arts -->
<html lang = "se">
  <ol>
    {#each artList as art}
        <li>
            <a href="/pixelarts/{art.id}">{art.name}</a>
            <label  for="favorite">Favorite:</label>
            <form action="?/favorite" method="post" use:enhance>
              <input type="hidden" name="artid" value="{art.id}">
              <button style="background-color: {art.isFavorite ? "green" : "red"}">Favorite</button>
            </form>
        </li>
        
      
    {/each}
  </ol>

  <!-- add a form for sending name width and height -->

  <form action="?/create" method="post">

    <label for="name">Name</label>
    <input type="text" name="name" id="name" required>

    <label for="width">Width</label>
    <input type="number" name="width" id="width" required>

    <label for="height">Height</label>
    <input type="number" name="height" id="height" required>



    <button type="submit">Create</button>
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