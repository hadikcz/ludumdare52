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
    left: 27px;
    top: 3px;
    width: 100px;
    position: relative;
    text-align: center;
    font-size: 23px;
    color: #b68962;
  }
  .icon {
    position: absolute !important;
    left: 9px !important;
    top: 6px;
  }
  .icon-pulse {
    animation-name: pulse;
    animation-duration: 0.4s;
    animation-timing-function: ease-out;
    animation-direction: alternate;
    //animation-iteration-count: infinite;
    animation-play-state: running;
  }
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1.0);
    }
  }
</style>

<div class="sprite empty_bar">
    Units:
    <div class="coin-wrapper">
        {units}
    </div>
</div>
