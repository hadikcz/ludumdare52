<script lang="ts">
    import GameScene from "scenes/GameScene";
	import {onDestroy} from "svelte";
	import './global.css';
	import CoinBar from "ui/svelte/ingame/CoinBar.svelte";
	import Shop from "ui/svelte/ingame/shop/Shop.svelte";
	import BuildingInfo from "ui/svelte/ingame/shop/BuildingInfo.svelte";
	import BuildingRegularModal from "ui/svelte/ingame/modals/BuildingRegularModal.svelte";

    export let scene: GameScene;

	onDestroy(() => {
		console.log('main app svelte DESTYROYD');
	});


</script>

<style lang="scss">
	.top-bar {
		top: 5px;
		left: 50%;
		transform: translateX(-50%);
		color: white;
		font-size: 25px;
		position: absolute;
	}
</style>

<main style="pointer-events: all">
	<div class="top-bar">
		<div style="width: 100px; height: 50px; background: red; color: white">
			<CoinBar scene="{scene}"></CoinBar>
		</div>
	</div>
	<BuildingRegularModal scene="{scene}"></BuildingRegularModal>
	<Shop scene="{scene}"></Shop>
	<BuildingInfo scene="{scene}"></BuildingInfo>
</main>
