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
    width: 100px;
    height: 354px;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
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
                price="{scene.shop.prices[BuyableEnum.CARRIER]}"
                icon="shop_icon_carrier"
                type="{BuyableEnum.CARRIER}"
                tooltip="Carrier - carry goods"
        ></ShopPurchaseButton>
        <ShopPurchaseButton
                events="{scene.events}"
                coins="{coins}"
                price="{scene.shop.prices[BuyableEnum.FARM]}"
                icon="shop_icon_farm"
                type="{BuyableEnum.FARM}"
                tooltip="Farm - produce wheat"
        ></ShopPurchaseButton>
        <ShopPurchaseButton
                events="{scene.events}"
                coins="{coins}"
                price="{scene.shop.prices[BuyableEnum.MILL]}"
                icon="shop_icon_mill"
                type="{BuyableEnum.MILL}"
                tooltip="Mill - produce flour from wheat"
        ></ShopPurchaseButton>
        <ShopPurchaseButton
                events="{scene.events}"
                coins="{coins}"
                price="{scene.shop.prices[BuyableEnum.BAKERY]}"
                icon="shop_icon_bakery"
                type="{BuyableEnum.BAKERY}"
                tooltip="Bakery - produce bread from flour"
        ></ShopPurchaseButton>
        <ShopPurchaseButton
                events="{scene.events}"
                coins="{coins}"
                price="{scene.shop.prices[BuyableEnum.INN]}"
                icon="shop_icon_inn"
                type="{BuyableEnum.INN}"
                tooltip="Inn - place where workers eat"
        ></ShopPurchaseButton>
        <ShopPurchaseButton
                events="{scene.events}"
                coins="{coins}"
                price="{scene.shop.prices[BuyableEnum.WAREHOUSE]}"
                icon="shop_icon_warehouse"
                type="{BuyableEnum.WAREHOUSE}"
                tooltip="Warehouse - storage of goods"
        ></ShopPurchaseButton>
    </div>
</div>
