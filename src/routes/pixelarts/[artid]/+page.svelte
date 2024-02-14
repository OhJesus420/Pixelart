<script lang="ts">
    import { browser } from '$app/environment';
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    
    import type { PageData } from './$types';

    export let data: PageData;
    let color = "#000000";

    let isEraser =false;
 
    if(browser){
        let timer = setInterval(() => {
            invalidateAll()
        }, 1000);
    }

   
</script>

<nav>
    <a href="/">Home</a>



</nav>
<hr>
<h1>{data.art.name}</h1>
<hr>

<!-- grid of all the pixels in data.Attr.pixels -->

<div class="center" ><div class="grid" style= "--width: {data.art.width}; --height: {data.art.height};">

    {#each data.art.pixels as pixel}
        <form action="?/update" method="post" use:enhance>
            <input type="hidden" name="pixelid" value="{pixel.id}">
            <input type='hidden'  name='color' value={isEraser ? 'white': color}  >
            <button class="pixel" style="background-color: {pixel.color};"  ></button>

        </form>
    {/each}
    </div>
    <label for="colorpicker">Colorpicker</label>
    <input type='color'  name='colorpicker' class='colorpicking' bind:value={color}>
    <label for="isEraser">Eraser</label>
    <input type='checkbox'  name='isEraser' class='eraser' bind:checked={isEraser}>
    

  
    
</div>
<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(var(--width), 1fr);
        grid-template-rows: repeat(var(--height), 1fr);
        gap: 1px; /* Adjust this value to increase or decrease the gap */
        margin-right: 10px;





    }
    .pixel {

        width: 20px;
        height: 20px;
        border: 1px solid black;
        
    }

    .center {
        display: flex;
        justify-content: center;

    }

     .eraser{
        width: 20px;
        height: 20px;
        border: 1px solid black;
     }

    

        .colorpicking{
            width: 50px;
            height: 30px;
            border: 1px solid black;
            margin-left: 10px;
            margin-right: 10px;
        }
    
</style>



