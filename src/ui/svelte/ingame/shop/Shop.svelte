<script lang="ts">

    import ShopPurchaseButton from "ui/svelte/ingame/shop/ShopPurchaseButton.svelte";
    import GameScene from "scenes/GameScene";
    import {BuyableEnum} from "core/shop/BuyableEnum";


    export let scene: GameScene;

    let coins = scene.shop.coins;
    scene.shop.coins$.subscribe((value) => {
        coins = value;
    });

</script>

<style lang="scss">
  .wrapper {
    height: 100%;
    width: auto;
    right: 0px;
    top: 0px;
    //transform: translateY(-50%);
    position: absolute;
    background: black; // temporary

    .items-wrapper {
      margin-top: 20px;
      margin-left: 20px;
      right: 20px;
      position: absolute;
    }

    .shop-shop_bg {
      position: absolute;
      right: 0;
      width: 110px;
      height: 100%;
      background: rgba(232, 207, 166, 0.74);
    }

  }
  .tooltip {
    border-bottom: 0!important; /* If you want dots under the hoverable text */
  }

</style>

<div class="wrapper">
    <div class="sprite shop-shop_bg"></div>
    <div class="items-wrapper">
        <ShopPurchaseButton
                events="{scene.events}"
                coins="{coins}"
                price="{scene.shop.prices[BuyableEnum.FARM]}"
                icon="farm"
                type="{BuyableEnum.FARM}"
                tooltip="{scene.shop.names[BuyableEnum.FARM]} - produce wheat"
        ></ShopPurchaseButton>
        <ShopPurchaseButton
                events="{scene.events}"
                coins="{coins}"
                price="{scene.shop.prices[BuyableEnum.MILL]}"
                icon="mill"
                type="{BuyableEnum.MILL}"
                tooltip="{scene.shop.names[BuyableEnum.MILL]} - produce flour from wheat"
        ></ShopPurchaseButton>
        <ShopPurchaseButton
                events="{scene.events}"
                coins="{coins}"
                price="{scene.shop.prices[BuyableEnum.BAKERY]}"
                icon="bakery"
                type="{BuyableEnum.BAKERY}"
                tooltip="{scene.shop.names[BuyableEnum.BAKERY]} - produce bread from flour"
        ></ShopPurchaseButton>
        <ShopPurchaseButton
                events="{scene.events}"
                coins="{coins}"
                price="{scene.shop.prices[BuyableEnum.INN]}"
                icon="inn"
                type="{BuyableEnum.INN}"
                tooltip="{scene.shop.names[BuyableEnum.INN]} - place where workers eat"
        ></ShopPurchaseButton>
        <ShopPurchaseButton
                events="{scene.events}"
                coins="{coins}"
                price="{scene.shop.prices[BuyableEnum.WAREHOUSE]}"
                icon="warehouse"
                type="{BuyableEnum.WAREHOUSE}"
                tooltip="{scene.shop.names[BuyableEnum.WAREHOUSE]} - storage of goods"
        ></ShopPurchaseButton>
        <ShopPurchaseButton
                events="{scene.events}"
                coins="{coins}"
                price="{scene.shop.prices[BuyableEnum.CARRIER]}"
                icon="carrier"
                type="{BuyableEnum.CARRIER}"
                tooltip="{scene.shop.names[BuyableEnum.CARRIER]} - carry goods"
        ></ShopPurchaseButton>
        <ShopPurchaseButton
                events="{scene.events}"
                coins="{coins}"
                price="{scene.shop.prices[BuyableEnum.PATHWAY]}"
                icon="path"
                type="{BuyableEnum.PATHWAY}"
                tooltip="{scene.shop.names[BuyableEnum.PATHWAY]} - pathway for faster movement"
        ></ShopPurchaseButton>
        <ShopPurchaseButton
                events="{scene.events}"
                coins="{coins}"
                price="{scene.shop.prices[BuyableEnum.PATHWAY_DESTROY]}"
                icon="path_destroy"
                type="{BuyableEnum.PATHWAY_DESTROY}"
                tooltip="{scene.shop.names[BuyableEnum.PATHWAY_DESTROY]} - remove pathway"
        ></ShopPurchaseButton>
    </div>
</div>
