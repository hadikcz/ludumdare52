<script lang="ts">
    import EventEmitter = Phaser.Events.EventEmitter;
    import {Events} from "enums/Events";
    import {BuyableEnum} from "core/shop/BuyableEnum";

    export let events: EventEmitter
    export let coins: number;
    export let price: number;
    export let icon: string;
    export let type: BuyableEnum;
    export let smallPriceSize: boolean = false;
    export let tooltip: string|null = null;

    function tryPurchase(): void {
        events.emit(Events.UI_SHOP_TRY_PURCHASE, type);
    }
</script>

<style lang="scss">
  .shop-item {
    margin-bottom: 5px;

    .price-row {
      margin-top: 3px;
    }
    .price {
      font-size: 20px;
      color: #ffd600;
      //color: #ffd600;
      display: inline-block;
      transform: translate(9px, -4px);
      width: 22px;
      text-align: center;
      left: 5px;
      margin-left: 0px;
    }
    .purchase-button {
      cursor: pointer;
      display: block;
    }

    .purchase-button:hover {
      filter: sepia(1);
    }

    .purchase-button.notEnoughCoins {
      filter: grayscale(0.75);
    }

    .price.notEnoughCoins {
      color: #ff6060;
    }

    .price.small {
      font-size: 12px;
    }
  }
</style>

<div class="shop-item  {tooltip ? 'tooltip left' : ''}" style="border-bottom: none;">
    <div class="sprite shop-buy_{icon} purchase-button {price > coins ? 'notEnoughCoins' : ''}" on:click|stopPropagation={tryPurchase}></div>
    <div class="price-row">
        <div class="price {price > coins ? 'notEnoughCoins' : ''} {smallPriceSize ? 'small' : ''}">
            {price}
        </div>
        <div class="sprite icon_coin"></div>
        {#if tooltip}
            <span class="tooltiptext">
                {tooltip}
            </span>
        {/if}
    </div>
</div>
