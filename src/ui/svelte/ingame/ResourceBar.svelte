<script lang="ts">
    import GameScene from "scenes/GameScene";
    import {GetResourceName} from "core/shop/Shop";
    export let scene: GameScene;

    let agregatedResources: number[] = scene.buildingHandler.getTotalAgregatedResources();

    setInterval(() => {
        agregatedResources = scene.buildingHandler.getTotalAgregatedResources();
    }, 500);
</script>

<style lang="scss">
  .wrapper {
    left: 0px;
    top: 30px;
    width: 100px;
    position: relative;
    text-align: center;
    font-size: 16px;
    color: #b68962;
    background: black;
  }
</style>

<div class="wrapper">
    Resources:<br>
    {#each Object.entries(agregatedResources) as [resourceType, amount]}
        {GetResourceName(resourceType)} {amount}<br>
    {/each}
</div>
