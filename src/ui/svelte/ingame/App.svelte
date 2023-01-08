<script lang="ts">
    import GameScene from "scenes/GameScene";
	import {onDestroy} from "svelte";
	import './global.css';
	import CoinBar from "ui/svelte/ingame/CoinBar.svelte";
	import Shop from "ui/svelte/ingame/shop/Shop.svelte";
	import BuildingInfo from "ui/svelte/ingame/shop/BuildingInfo.svelte";
	import BuildingRegularModal from "ui/svelte/ingame/modals/BuildingRegularModal.svelte";
	import BuildingStorageModal from "ui/svelte/ingame/modals/BuildingStorageModal.svelte";
	import UnitModal from "ui/svelte/ingame/modals/UnitModal.svelte";
	import UnitBar from "ui/svelte/ingame/UnitBar.svelte";
	import ResourceBar from "ui/svelte/ingame/ResourceBar.svelte";

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
		width: auto;
		text-align: center;
		width: 300px;
	}
</style>

<main style="pointer-events: all">
	<div class="top-bar">
		<CoinBar scene="{scene}"></CoinBar>
		<UnitBar scene="{scene}"></UnitBar>
	</div>
	<BuildingRegularModal scene="{scene}"></BuildingRegularModal>
	<BuildingStorageModal scene="{scene}"></BuildingStorageModal>
	<Shop scene="{scene}"></Shop>
	<BuildingInfo scene="{scene}"></BuildingInfo>
	<UnitModal scene="{scene}"></UnitModal>
	<ResourceBar scene="{scene}"></ResourceBar>
</main>
