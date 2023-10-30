<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card class="pa-5">
                    <h1 class="text-center">404 Not Found</h1>
                    <p class="text-center">The page you are looking for does not exist.</p>
                    <v-btn color="primary" block to="/">Go back to home</v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'NotFoundView'
}
</script>

<style>
/* Add custom styles here */
</style>
