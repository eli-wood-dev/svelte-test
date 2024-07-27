<script>
  import Person from "./Person.svelte";
  import {isEmptyJson} from "./lib/utils.js"
  let promise = getPeople();
  let search = "";

  async function getPeople(name=""){
    const res = await fetch(`http://localhost:8080/people?name=${name}`);
    const text = await res.text();

    if(res.ok){
      return JSON.parse(text);
    } else {
      throw new Error(text);
    }
  }

  function handleClick(){
    promise = getPeople(search);
  }
</script>

<main>
  <label for="nameInput">Which person?</label>
  <br/>
  <input id="nameInput" type="text" bind:value={search}/>
  <br/>
  <button on:click={handleClick}>Get People</button>

  {#await promise}
    <p>waiting...</p>
  {:then people} 
    {#if people && !isEmptyJson(people)}
      {#each people as person}
        <Person {person}></Person>
      {/each}
    {:else}
      <p>no people found</p>
    {/if}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</main>

