<script lang="ts">
    import GameScene from "scenes/GameScene";
    import {Subscription} from "rxjs";
    export let scene: GameScene;

    let units = scene.unitHandler.getUnitCount();
    let unitSubscriber: Subscription|null;


    scene.unitHandler.units$.subscribe((countOfUnits: number) => {
        units = countOfUnits;
    });
</script>

<style lang="scss">
  .coin-wrapper {
    left: 1px;
    top: 3px;
    width: 100px;
    position: relative;
    text-align: center;
    font-size: 23px;
    color: #b68962;
  }
</style>


<div style="display: block; width: 120px;;     transform: translate(103px, -39px);">
    <div class="sprite modals-unit_bar">
        <div class="coin-wrapper">
            {units}
        </div>
    </div>
</div>
