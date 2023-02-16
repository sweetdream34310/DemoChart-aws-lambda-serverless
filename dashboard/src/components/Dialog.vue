<template>
    <div class="modal" @click.self="$emit('onClose')">
        <div class="modal-container" @click.prevent>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
	name: "Dialog"
}
</script>

<style scoped lang="scss">

    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(94, 94, 94, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-container {
        max-width: 700px;
        max-height: 550px;
        background: white;
        border-radius: 5px;
        padding: 64px;
    }

</style>