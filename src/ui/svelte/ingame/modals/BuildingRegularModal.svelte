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

    scene.events.on(Events.CLOSE_ALL_MODALS, () => {
        close();
    });
    scene.events.on(Events.UI_BUILDING_OPEN, (building: IBuilding) => {
        scene.events.emit(Events.CLOSE_ALL_MODALS);
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

        inputStorageSubscriber = building.inputStorage$.subscribe(() => {
            inputStorageItemCount = building.getSizeInputStorage()
        });

        outputStorageSubscriber = building.outputStorage$.subscribe(() => {
            outputStorageItemCount = building.getSizeOutputStorage()
        });

        inputStorageItemCount = building.getSizeInputStorage()
        outputStorageItemCount = building.getSizeOutputStorage()

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
      width: 200px;
      height: 200px;
      transform: translate(-50%, -50%);
      background: red;

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
          margin-top: -2px;
          left: 50%;
          transform: translateX(-50%);
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

    }
</style>


{#if visible}
    <div class="modal">
        <div class="sprite modals-feeder-close_button close" on:click|stopPropagation={close}>
            <button type="button">X</button>
        </div>
        <div class="sprite modals-well-bg bg"></div>
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
                    Import ({inputItemName})
                </div>
                {inputStorageItemCount}/{storageSize}
            {/if}
            {#if hasOutputStorage}
                <div class="info">
                    Export ({outputItemName}
                </div>
                {outputStorageItemCount}/{storageSize}
            {/if}



            <div class="button-wrapper tooltip">
                <div class="button sprite modals-feeder-destroy_button"></div>
                <button type="button" on:click|stopPropagation={destroy}>
                    Destroy
                    <span class="tooltiptext">
                        Destroy
                    </span>
                </button>
            </div>

            <div class="button-wrapper tooltip">
                <div class="button sprite modals-feeder-destroy_button"></div>
                <button type="button"  on:click|stopPropagation={pauseToggle}>
                    {#if paused}Resume{:else}Pause{/if} building
                    <span class="tooltiptext">
                        {#if paused}Resume{:else}Pause{/if} building
                    </span>
                </button>
            </div>

        </div>
    </div>
{/if}
