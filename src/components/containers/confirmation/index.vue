<template>
<div>
    <div>Thank you test was booked successfully!</div>
    <button @click="goToDashboard">Go to your tests</button>
</div>
</template>

<script>
export default {
    methods: {
        goToDashboard() {
            this.$router.push("/dashboard")
        }
    }
}
</script>