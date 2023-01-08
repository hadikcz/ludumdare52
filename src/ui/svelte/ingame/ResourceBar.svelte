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
    width: 60px;
    position: relative;
    text-align: center;
    font-size: 16px;
    color: #b68962;
    background: rgba(232, 207, 166, 0.74);


    .icon_flour {
      transform: translateY(5px);
    }
  }
</style>

<div class="wrapper">
    <table>

    {#each Object.entries(agregatedResources) as [resourceType, amount]}
        <tr>
            <td><div style="display: inline-block; margin-left: 5px">{amount}</div></td>
            <td><div class="sprite icon_{resourceType}"></div><br>
            </td>
        </tr>
<!--        <div style="height: 40px">-->

<!--            <div style="display: inline-block; margin-left: 5px">{amount}</div>-->
<!--        <div class="sprite icon_{resourceType}"></div><br>-->

<!--        </div>-->
    {/each}
    </table>
</div>
