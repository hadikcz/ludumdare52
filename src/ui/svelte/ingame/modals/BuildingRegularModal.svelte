<script lang="ts">

    import GameScene from "scenes/GameScene";
    import {Events} from "enums/Events";
    import {IBuilding} from "core/building/IBuilding";
    import {Subscription} from "rxjs";
    import {GetResourceName} from "core/shop/Shop";

    export let scene: GameScene;

    let lastBuilding: IBuilding|null = null;
    let visible = false;
    let buildingName = ''
    let storageSize = 0;
    let hasInputStorage = false;
    let hasOutputStorage = false;
    let inputStorageItemCount = 0;
    let outputStorageItemCount = 0;
    let inputItemName = ''
    let outputItemName = '';
    let paused = false;
    let pausedSubscriber: Subscription;
    let inputStorageSubscriber: Subscription;
    let outputStorageSubscriber: Subscription;
    let progressInput = 100;
    let progressOutput = 100;

    scene.events.on(Events.CLOSE_ALL_MODALS, () => {
        close();
    });
    scene.events.on(Events.UI_BUILDING_OPEN, (building: IBuilding) => {
        scene.events.emit(Events.CLOSE_ALL_MODALS);
        if (scene.builder.isBuildMode()) {
            return;
        }
        lastBuilding = building;
        buildingName = building.getName();
        paused = building.isPaused();

        storageSize = building.getStorageSize();

        hasInputStorage = !!building.getInputItemType();
        hasOutputStorage = !!building.getOutputItemType();

        pausedSubscriber = building.paused$.subscribe((isPaused: boolean) => {
            paused = isPaused;
        });
        paused = building.isPaused();
        inputStorageItemCount = building.getSizeInputStorage()
        outputStorageItemCount = building.getSizeOutputStorage()

        progressInput = Math.round((inputStorageItemCount / storageSize) * 100);
        progressOutput = Math.round((outputStorageItemCount / storageSize) * 100);

        inputStorageSubscriber = building.inputStorage$.subscribe(() => {
            inputStorageItemCount = building.getSizeInputStorage()
            progressInput = Math.round((inputStorageItemCount / storageSize) * 100);
        });

        outputStorageSubscriber = building.outputStorage$.subscribe(() => {
            outputStorageItemCount = building.getSizeOutputStorage()
            progressOutput = Math.round((outputStorageItemCount / storageSize) * 100);
        });


        inputItemName = GetResourceName(building.getInputItemType());
        outputItemName = GetResourceName(building.getOutputItemType());
        visible = true;

    });

    function close() {
        if (inputStorageSubscriber) {
            inputStorageSubscriber.unsubscribe();
        }
        if (outputStorageSubscriber) {
            outputStorageSubscriber.unsubscribe();
        }
        if (pausedSubscriber) {
            pausedSubscriber.unsubscribe();
        }
        visible = false;
    }

    function destroy(): void {
        if (!lastBuilding) {
            return;
        }
        lastBuilding.tryDestroy();
        close();
    }

    function pauseToggle(): void {
        if (!lastBuilding) {
            return;
        }

        lastBuilding.pauseToggle();
    }

</script>

<style lang="scss">
    .modal {
      pointer-events: all;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #b68962;

      .bg {
        z-index: 4999;

      }
      .close {
        position: absolute;
        top: -10px;
        left: -10px;
        cursor: pointer;
        z-index: 5000;
      }
      .close:hover {
        filter: sepia(1);
      }

      .inside {
        pointer-events: all;
        line-height: 17px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        .title {
          margin-top: 5px;
          width: 100%;
          text-align: center;
          font-size: 25px;
          color: #b68962;
        }


        .progressBar {
          position: relative;
          margin-top: 10px;
          left: 50%;
          transform: translateX(-50%);
        }
        .inner {
          transform: translate(4.5px, -5px);
        }


        .progress {
          text-align: center;
          font-size: 20px;
          color: #b68962;
        }

        .modals-feeder-progress_bar_fill.water {
          filter: hue-rotate(113deg);
        }

        .info {
          font-size: 16px;
          word-spacing: 1px;
          color: #b68962;
          text-align: center;
        }
        .button {
          text-align: center;
          cursor: pointer;
          display: inline-block;
          transform: translateY(4px);
        }

        .button:hover {
          filter: sepia(1);
        }

        .buttons-wrapper {
          text-align: center;
        }

        .note {
          color: red;
          font-size: 10px;
          text-align: center;
          transform: translateY(-4px);
        }

      }

      .bottom-part {
        bottom: 10px;
        left: 5px;
        text-align: center;
        width: 100%;
        position: absolute;
        text-align: center;
      }

      .inline {
        display: inline-block;
      }

      .icon_flour {
        transform: translateY(5px);
      }


    }
</style>


{#if visible}
    <div class="modal">
        <div class="sprite modals-close close" on:click|stopPropagation={close}></div>
        <div class="sprite modals-storage_bg bg"></div>
        <div class="inside">
            <div class="title">
                {buildingName}
            </div>

            {#if paused}
                <div class="info">
                    PAUSED
                </div>
            {/if}


            {#if hasInputStorage}
                <div class="info">
                    Import <div class="sprite icon_{lastBuilding.getInputItemType()}"></div>
                </div>
                <div class="progressBar sprite modals-progress_outer">
                    <div class="sprite modals-progress_inner inner" style="width: {progressInput}%;"></div>
                </div>
                <div class="info">
                    {inputStorageItemCount}/{storageSize}
                </div>
            {/if}

            {#if hasOutputStorage}
                <div class="info">
                    Export <div class="sprite icon_{lastBuilding.getOutputItemType()}"></div>
                </div>
                <div class="progressBar sprite modals-progress_outer">
                    <div class="sprite modals-progress_inner inner" style="width: {progressOutput}%;"></div>
                </div>
                <div class="info">
                    {outputStorageItemCount}/{storageSize}
                </div>
            {/if}

            <div class="bottom-part">
                <div class="button-wrapper tooltip inline">
                    <div class="button sprite modals-button_b"  on:click|stopPropagation={destroy} style="font-size: 14px;">
                        <div style="transform: translateY(6px)">Destroy</div>
                    </div>
                    <span class="tooltiptext">
                        Destroy
                    </span>
                </div>

                <div class="button-wrapper tooltip inline" on:click|stopPropagation={pauseToggle}>
                    <div class="button sprite modals-button_b">
                        <div style="transform: translateY(6px); font-size: 14px">
                            {#if paused}Resume{:else}Pause{/if}
                        </div>
                    </div>
                    <span class="tooltiptext">
                        {#if paused}Resume{:else}Pause{/if} building
                    </span>
                </div>
            </div>

        </div>
    </div>
{/if}
