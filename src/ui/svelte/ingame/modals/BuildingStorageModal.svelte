<script lang="ts">

    import GameScene from "scenes/GameScene";
    import {Events} from "enums/Events";
    import {IBuilding} from "core/building/IBuilding";
    import {Subscription} from "rxjs";
    import BuildingWarehouse from "core/building/BuildingWarehouse";
    import {GetResourceName, GetResourceSellPrice} from "core/shop/Shop";
    import {ResourceItem} from "core/resources/ResourceItem";

    export let scene: GameScene;

    let muliplier10Enable = false;
    let paused = false;
    let pausedSubscriber: Subscription;
    let lastWarehouse: BuildingWarehouse|null = null;
    let visible = false;
    let storageSize = 0;
    let inputStorageItemCount = 0;
    let agregatedResources: number[] = [];
    let progress = 100;

    let inputStorageSubscriber: Subscription;

    scene.events.on(Events.CLOSE_ALL_MODALS, () => {
        close();
    });
    scene.events.on(Events.UI_WAREHOUSE_OPEN, (building: BuildingWarehouse) => {
        scene.events.emit(Events.CLOSE_ALL_MODALS);
        if (scene.builder.isBuildMode()) {
            return;
        }
        lastWarehouse = building

        storageSize = building.getStorageSize();

        agregatedResources = building.getAgregatedResources();
        inputStorageSubscriber = building.inputStorage$.subscribe(() => {
            inputStorageItemCount = building.getSizeInputStorage()
            agregatedResources = building.getAgregatedResources();
            progress = Math.round((inputStorageItemCount / storageSize) * 100);
        });
        pausedSubscriber = building.paused$.subscribe((isPaused: boolean) => {
            paused = isPaused;
        });
        inputStorageItemCount = building.getSizeInputStorage()
        paused = building.isPaused();
        progress = Math.round((inputStorageItemCount / storageSize) * 100);

        visible = true;

    });

    function close() {
        if (inputStorageSubscriber) {
            inputStorageSubscriber.unsubscribe();
        }
        if (pausedSubscriber) {
            pausedSubscriber.unsubscribe();
        }
        lastWarehouse = null;
        visible = false;
    }

    function sell(resource: ResourceItem): void {
        if (!lastWarehouse) return;

        if (muliplier10Enable) {
            for (let i = 0; i < 10; i++) {
                lastWarehouse.sell(resource);
            }
        } else {
            lastWarehouse.sell(resource);
        }
    }

    function destroy(): void {
        if (!lastWarehouse) {
            return;
        }
        lastWarehouse.tryDestroy();
        close();
    }

    function pauseToggle(): void {
        if (!lastWarehouse) {
            return;
        }

        lastWarehouse.pauseToggle();
    }


</script>

<style lang="scss">
    .modal {
      pointer-events: all;
      position: absolute;
      top: 50%;
      left: 50%;
      color: #b68962;

      transform: translate(-50%, -50%);

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
        .inner {
          transform: translate(4.5px, -5px);
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
          font-size: 18px;
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
        .button_coins {
          .icon_coin {
            transform: translateY(5px);
          }
        }

      }

      .item-wrapper {
        text-align: center;
        margin-left: 5px;

        .res-icon {
          transform: translateY(4px);
        }
      }

      .modals-x10 {
        .inner {
          transform: translate(4px, 5px);
        }
      }

      .bottom-part {
        bottom: 5px;
        left: 5px;
        position: absolute;
        text-align: center;
      }

      .inline {
        display: inline-block;
      }

    }
</style>


{#if visible}
    <div class="modal">
        <div class="sprite modals-close close" on:click|stopPropagation={close}></div>
        <div class="sprite modals-storage_bg bg"></div>
        <div class="inside">
            <div class="title">
                Warehouse
            </div>

            <div class="info">
                PAUSED
            </div>
            {#if paused}
            {/if}

            <div class="progressBar sprite modals-progress_outer">
                <div class="sprite modals-progress_inner inner" style="width: {progress}%;"></div>
            </div>
            <div class="info">
                {inputStorageItemCount}/{storageSize}
            </div>

            <div class="item-wrapper">

                {#each Object.entries(agregatedResources) as [resourceType, amount]}
                    <div>
                        <div class="sprite icon_{resourceType} res-icon"></div> {amount} {GetResourceName(resourceType)} <div class="sprite modals-button_a button button_coins" on:click|stopPropagation={sell(resourceType)}>{GetResourceSellPrice(resourceType, muliplier10Enable)} <div class="sprite icon_coin"></div></div>
                    </div>

    <!--                <button type="button"  on:click|stopPropagation={sell(resourceType)}>SELL {GetResourceSellPrice(resourceType, muliplier10Enable)} coins</button>-->
                {/each}
            </div>

            <div class="bottom-part">
                <div class="sprite modals-x10 button inline" on:click={() => muliplier10Enable = !muliplier10Enable}>
                    <div class="inner">x10</div>
                </div>

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
