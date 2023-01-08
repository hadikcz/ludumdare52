<script lang="ts">
    import GameScene from "scenes/GameScene";
    import {Events} from "enums/Events";
    import {BuildingsEnum} from "core/building/BuildingsEnum";

    export let scene: GameScene;

    let building: BuildingsEnum|null = null;
    let visible = false;
    scene.builder.buildModeRunning$.subscribe((val) => {
       visible = val;
       building = scene.builder.buildMode;
    });

    function handleCancel(): void {
        visible = false;
        scene.events.emit(Events.CANCEL_BUILDING)
    }
</script>

<style lang="scss">
  .actionInfo {
    padding: 5px;
    height: auto;
    left: 50%;
    top: 100px;
    position: absolute;
    transform: translateX(-50%);
    z-index: 1000;
    pointer-events: all;

    font-size: 25px;
    color: #b68962;
  }


  .buildingInfo {
    margin-left: 10px;
    margin-top: 3px;
  }

  .actionMenu {
    //position: absolute;
    //top: 130px;
    //right: 0;
    //width: auto;
    //height: auto;
    //background: rgba(0,0,0, 0.5);
    //padding: 5px;

    .actionButton{
      text-align: center;
      width: auto;
      height: auto;
      color: white;
      background: black;
      padding: 5px;
      pointer-events: all;
      cursor: pointer;
      margin-top: 3px;
      margin-bottom: 3px;
    }

    .cancelIcon {
      transform: translate(-4px, 3px);
    }
  }

</style>

{#if visible}
<div class="actionMenu">
    <div class="actionInfo">
        <div class="sprite modals-buildmodemodal">
            <div class="buildingInfo">
                Place building <span id="buildingName"></span>
                <div class="button sprite modals-button_b"  on:click|stopPropagation={handleCancel} style="font-size: 14px; transform: translate(25px, 5px);">
                    <div style="transform: translate(23px, 8px)">CANCEL</div>
                </div>
<!--                <div class="sprite modals-feeder-destroy_button cancelIcon">-->
<!--                    <button type="button"  on:click|stopPropagation={handleCancel}>CANCEL</button>-->
<!--                </div>-->
            </div>

        </div>
    </div>
</div>
{/if}
