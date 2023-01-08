<script lang="ts">
    import GameScene from "scenes/GameScene";
    export let scene: GameScene;
    let coins = scene.shop.coins;
    let animate = false;
    scene.shop.coins$.subscribe((value: number) => {
        if (value > coins) {
            animate = true;
            setTimeout(() => {
                animate = false;
            }, 500)
        }
        coins = value;
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

<div style="display: block; width: 120px;">
    <div class="sprite modals-coin_bar">
        <div class="coin-wrapper">
            {Math.round(coins)}
        </div>
    </div>
</div>
