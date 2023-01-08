<script lang="ts">

    import GameScene from "scenes/GameScene";
    import {Events} from "enums/Events";
    import {IBuilding} from "core/building/IBuilding";
    import {Subscription} from "rxjs";
    import BuildingWarehouse from "core/building/BuildingWarehouse";
    import {GetResourceName, GetResourceSellPrice} from "core/shop/Shop";
    import {ResourceItem} from "core/resources/ResourceItem";
    import UnitCarrier from "core/units/UnitCarrier";
    import {UnitState} from "core/units/UnitState";

    export let scene: GameScene;

    let lastUnit: UnitCarrier|null = null;
    let visible = false;
    let resource: ResourceItem|null = null;
    let hunger = 0;
    let hungerSubscription: Subscription|null = null;
    let resourceSubscription: Subscription|null = null;

    let unitStateSubscrption: Subscription|null = null;
    let unitState: UnitState|null;
    let progress = 100;


    scene.events.on(Events.CLOSE_ALL_MODALS, () => {
        close();
    });
    scene.events.on(Events.UI_UNIT_OPEN, (unit: UnitCarrier) => {
        scene.events.emit(Events.CLOSE_ALL_MODALS);
        if (scene.builder.isBuildMode()) {
            return;
        }
        lastUnit = unit
        visible = true;

        hungerSubscription = unit.hunger$.subscribe((lastHunger: number) => {
            hunger = lastHunger;
            progress = Math.round((lastHunger / 100) * 100);
        });
        hunger = unit.getHunger();
        progress = Math.round((hunger / 100) * 100);

        resourceSubscription = unit.resource$.subscribe((lastResource: ResourceItem|null) => {
            resource = lastResource;
        });
        resource = unit.getResource();

        unitStateSubscrption = unit.unitState$.$.subscribe((lastUnitState: UnitState) => {
            unitState = lastUnitState;
        });
        unitState = unit.unitState$.getValue();


    });

    function close() {
        visible = false;

        if (hungerSubscription) {
            hungerSubscription.unsubscribe();
        }
        if (resourceSubscription) {
            resourceSubscription.unsubscribe();
        }

        if (unitStateSubscrption) {
            unitStateSubscrption.unsubscribe();
        }
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
            <div class="title" style="margin-top: 10px">
                {lastUnit?.name}
            </div>

            <div class="info">
                Carrier
            </div>

           <div class="info" style="margin-top: 10px">
               Resource<br>
               {#if resource}
                   <div class="sprite icon_{resource}"></div>
               {:else}
                   Empty
               {/if}
           </div>

            <div class="info" style="margin-top: 10px">
                Hunger<br>
            </div>
            <div class="progressBar sprite modals-progress_outer" style="margin-top: 1px">
                <div class="sprite modals-progress_inner inner" style="width: {progress}%;"></div>
            </div>


            <div class="info" style="margin-top: 10px">
                Action<br> {unitState}
            </div>

        </div>
    </div>
{/if}
