<template>
    <v-container class="" fluid>

        <v-btn class="text-center" to="/">
            <v-icon>mdi-home</v-icon>
            Home
        </v-btn>

        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
            <div class="text-subtitle-1 text-medium-emphasis">Account</div>

            <v-text-field density="compact" placeholder="Username" prepend-inner-icon="mdi-account-outline"
                variant="outlined" v-model="username"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Password

            </div>

            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                label="Normal with hint text" hint="At least 8 characters" counter
                @click:append="show1 = !show1"></v-text-field>


            <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="register">
                Register
            </v-btn>

        </v-card>

    </v-container>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            username: '',
            show1: false,
            password: '',
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                emailMatch: () => (`The email and password you entered don't match`),
            },
        }
    },
    methods: {
        register() {
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.post("http://localhost:8000/register/", {
                username: this.username,
                password: this.password,
            }).then((res) => {
                console.log(res);
                if (res.status == 201) {
                    localStorage.tokenAccess = res.data.access
                    localStorage.tokenRefresh = res.data.refresh
                    
                    this.$router.push("/login");
                } else {
                    alert("Login failed");
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>